using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Mvc;
using Microsoft.Extensions.OptionsModel;
using Newtonsoft.Json;
using React.Models;
using Microsoft.Extensions.DependencyInjection;

namespace React.Controllers.Account
{
    public class ServerController : BaseController
    {
        UserManager<ApplicationUser> _userManager;
        SignInManager<ApplicationUser> _signInManager;

        public ServerController(UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager)
            : base(userManager,
                 signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [Route("register")]
        public async Task<IActionResult> Register()
        {
            return View("js-{auto}", await BuildState());
        }

        [Route("login")]
        public async Task<IActionResult> Login()
        {
            return View("js-{auto}", await BuildState());
        }

        [Route("forgotpassword")]
        public async Task<IActionResult> ForgotPassword()
        {
            return View("js-{auto}", await BuildState());
        }

        [Route("resetpassword", Name="resetpassword")]
        public async Task<IActionResult> ResetPassword()
        {
            return View("js-{auto}", await BuildState());
        }

        [Route("confirmemail", Name="confirmemail")]
        public async Task<IActionResult> ConfirmEmail(string userId, string code)
        {
            var state = await BuildState();

            if (userId == null || code == null)
            {
                ViewBag.confirmEmailSuccess = false;
                return View("js-{auto}", state);
            }

            var user = await _userManager.FindByIdAsync(userId);

            if (user == null)
            {
                ViewBag.confirmEmailSuccess = false;
                return View("js-{auto}", state);
            }

            var result = await _userManager.ConfirmEmailAsync(user, code);

            ViewBag.confirmEmailSuccess = result.Succeeded;

            return View("js-{auto}", state);
        }

        [Route("externallogincallback")]
        public async Task<IActionResult> ExternalLoginCallback(bool autoLogin = true)
        {
            var callbackTemplate = new Func<object, string>(x =>
            {
                var serializerSettings = HttpContext
                   .RequestServices
                   .GetRequiredService<IOptions<MvcJsonOptions>>()
                   .Value
                   .SerializerSettings;
                var serialized = JsonConvert.SerializeObject(x, serializerSettings);
                return
                $@"<html lang=""en-us"">
                    <head>
                        <script type=""text/javascript"">
                            opener.postMessage({serialized}, location.origin);
                        </script>
                    </head>
                    <body></body>
                </html>";
            });

            dynamic data = new ExpandoObject();
            data.externalAuthenticated = false;
            data.loginProvider = null;
            data.user = null;
            data.requiresTwoFactor = false;
            data.lockedOut = false;
            data.signedIn = false;
            data.signInError = false;
            data.proposedEmail = "";
            data.proposedUserName = "";

            var info = await _signInManager.GetExternalLoginInfoAsync();
            if (info == null)
                // unable to authenticate with an external login
                return Content(callbackTemplate(data), "text/html");

            if (string.IsNullOrEmpty(info.ProviderDisplayName))
            {
                info.ProviderDisplayName =
                    _signInManager.GetExternalAuthenticationSchemes()
                        .SingleOrDefault(x => x.AuthenticationScheme.Equals(info.LoginProvider))?
                        .DisplayName;
                if (string.IsNullOrEmpty(info.ProviderDisplayName))
                {
                    info.ProviderDisplayName = info.LoginProvider;
                }
            }

            data.loginProvider = new
            {
                scheme = info.LoginProvider,
                displayName = info.ProviderDisplayName
            };

            data.externalAuthenticated = true;

            var email = info.ExternalPrincipal.FindFirstValue(ClaimTypes.Email);
            var userName = info.ExternalPrincipal.FindFirstValue(ClaimTypes.Name);
            if (!string.IsNullOrEmpty(userName))
                userName = userName.Replace(" ", "_");

            data.proposedEmail = email;
            data.proposedUserName = userName;

            // sign in the user with this external login provider if the user already has a login.
            if (autoLogin)
            {
                var user = await _userManager.FindByLoginAsync(info.LoginProvider, info.ProviderKey);
                if (user != null)
                {
                    var result =
                        await _signInManager.ExternalLoginSignInAsync(info.LoginProvider, info.ProviderKey, false);

                    if (result.Succeeded)
                    {
                        data.signedIn = true;
                        data.user = React.Models.Api.User.From(user);
                        return Content(callbackTemplate(data), "text/html");
                    }

                    data.signInError = true;

                    if (result.RequiresTwoFactor)
                    {
                        data.requiresTwoFactor = true;
                        data.userFactors = await _userManager.GetValidTwoFactorProvidersAsync(user);
                    }
                    if (result.IsLockedOut)
                        data.lockedOut = true;

                    return Content(callbackTemplate(data), "text/html");
                }
            }

            return Content(callbackTemplate(data), "text/html");
        }

        [Route("externalloginredirect")]
        public IActionResult ExternalLoginRedirect(string provider, bool autoLogin = true)
        {
            var properties = _signInManager.ConfigureExternalAuthenticationProperties(provider, "/externallogincallback?autoLogin=" + autoLogin);
            return new ChallengeResult(provider, properties);
        }
    }
}
