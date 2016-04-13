using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Authorization;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Mvc;
using React.Controllers.Manage.Models;
using React.Models;
using React.Services;
using React.State;
using React.State.Manage;

namespace React.Controllers.Manage
{
    [Authorize]
    [Route("api/manage")]
    public class ApiController : BaseController
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IEmailSender _emailSender;

        public ApiController(UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            IEmailSender emailSender)
            : base(userManager, signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _emailSender = emailSender;
        }

        [Route("security")]
        public async Task<object> Security()
        {
            var user = await GetCurrentUserAsync();

            return new
            {
                twoFactorEnabled = await _userManager.GetTwoFactorEnabledAsync(user),
                validTwoFactorProviders = await _userManager.GetValidTwoFactorProvidersAsync(user),
                emailConfirmed = await _userManager.IsEmailConfirmedAsync(user)
            };
        }

        [Route("settwofactor")]
        public async Task<object> SetTwoFactor([FromBody]SetTwoFactorModel model)
        {
            var user = await GetCurrentUserAsync();

            if (await _userManager.GetTwoFactorEnabledAsync(user) == model.Enabled)
            {
                // already set
                return new
                {
                    success = true
                };
            }
            
            await _userManager.SetTwoFactorEnabledAsync(user, model.Enabled);

            return new
            {
                twoFactorEnabled = await _userManager.GetTwoFactorEnabledAsync(user),
                success = true
            };
        }

        [Route("email")]
        public async Task<object> Email()
        {
            var user = await GetCurrentUserAsync();

            return new
            {
                email = await _userManager.GetEmailAsync(user),
                emailConfirmed = await _userManager.IsEmailConfirmedAsync(user)
            };
        }

        [Route("changeemail")]
        public async Task<object> ChangeEmail([FromBody]ChangeEmailModel model)
        {
            if (!ModelState.IsValid)
            {
                return new
                {
                    success = false,
                    errors = GetModelState()
                };
            }

            var user = await GetCurrentUserAsync();

            if (!await _userManager.CheckPasswordAsync(user, model.CurrentPassword))
            {
                ModelState.AddModelError("currentPassword", "Invalid password.");
                return new
                {
                    success = false,
                    errors = GetModelState()
                };
            }

            // send an email to the user asking them to finish the change of email.
            var code = await _userManager.GenerateChangeEmailTokenAsync(user, model.Email);
            var callbackUrl = Url.RouteUrl("confirmemail", new { userId = user.Id, newEmail = model.Email, code = code }, protocol: HttpContext.Request.Scheme);
            await _emailSender.SendEmailAsync(model.Email, "Confirm your email change", "Please confirm your new email by clicking this link: <a href=\"" + callbackUrl + "\">link</a>");
            
            return new
            {
                success = true
            };
        }

        [Route("verifyemail")]
        public async Task<object> VerifyEmail()
        {
            var user = await GetCurrentUserAsync();
            
            // send an email to the user asking them to finish the change of email.
            var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            var callbackUrl = Url.RouteUrl("confirmemail", new { userId = user.Id, code = code }, protocol: HttpContext.Request.Scheme);
            await _emailSender.SendEmailAsync(user.Email, "Confirm your email change", "Please confirm your new email by clicking this link: <a href=\"" + callbackUrl + "\">link</a>");

            return new
            {
                success = true
            };
        }

        [Route("changepassword")]
        public async Task<object> ChangePassword([FromBody]ChangePasswordModel model)
        {
            if (!ModelState.IsValid)
            {
                return new
                {
                    success = false,
                    errors = GetModelState()
                };
            }
            var user = await GetCurrentUserAsync();
            var result = await _userManager.ChangePasswordAsync(user, model.OldPassword, model.NewPassword);
            if (result.Succeeded)
            {
                await _signInManager.SignInAsync(user, isPersistent: false);
                return new
                {
                    success = true
                };
            }
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError(string.Empty, error.Description);
            }
            return new
            {
                success = false,
                errors = GetModelState()
            };
        }

        [Route("externallogins")]
        public async Task<object> ExternalLogins()
        {
            return new
            {
                success = true,
                externalLogins = await GetExternalLoginsState()
            };
        }

        [Route("addexternallogin")]
        public async Task<object> AddExternalLogin()
        {
            var user = await GetCurrentUserAsync();
            var info = await _signInManager.GetExternalLoginInfoAsync();
            if (info == null)
            {
                return new
                {
                    success = false,
                    externalLogins = await GetExternalLoginsState(),
                    errors = new List<string> { "Enable to authenticate with service." }
                };
            }
            var result = await _userManager.AddLoginAsync(user, info);

            if (result.Succeeded)
            {
                return new
                {
                    success = true,
                    externalLogins = await GetExternalLoginsState()
                };
            }

            return new
            {
                success = false,
                externalLogins = await GetExternalLoginsState(),
                errors = result.Errors.Select(x => x.Description)
            };
        }

        [Route("removeexternallogin")]
        public async Task<object> RemoveExternalLogin([FromBody]RemoveExternalLoginModel model)
        {
            var user = await GetCurrentUserAsync();
            var result = await _userManager.RemoveLoginAsync(user, model.LoginProvider, model.ProviderKey);
            if (result.Succeeded)
            {
                await _signInManager.SignInAsync(user, isPersistent: false);
                return new
                {
                    success = true,
                    externalLogins = await GetExternalLoginsState()
                };
            }
            return new
            {
                success = false,
                error = result.Errors.Select(x => x.Description)
            };
        }

        private async Task<ExternalLoginsState> GetExternalLoginsState()
        {
            var user = await GetCurrentUserAsync();
            var userLogins = await _userManager.GetLoginsAsync(user);
            foreach (var userLogin in userLogins.Where(userLogin => string.IsNullOrEmpty(userLogin.ProviderDisplayName)))
            {
                userLogin.ProviderDisplayName =
                    _signInManager.GetExternalAuthenticationSchemes()
                        .SingleOrDefault(x => x.AuthenticationScheme.Equals(userLogin.LoginProvider))?
                        .DisplayName;
                if (string.IsNullOrEmpty(userLogin.ProviderDisplayName))
                {
                    userLogin.ProviderDisplayName = userLogin.LoginProvider;
                }
            }
            var otherLogins = _signInManager.GetExternalAuthenticationSchemes().Where(auth => userLogins.All(ul => auth.AuthenticationScheme != ul.LoginProvider)).ToList();

            return new ExternalLoginsState
            {
                CurrentLogins = userLogins.Select(x => new ExternalLoginsState.ExternalLogin
                {
                    ProviderKey = x.ProviderKey,
                    LoginProvider = x.LoginProvider,
                    LoginProviderDisplayName = x.ProviderDisplayName
                }).ToList(),
                OtherLogins = otherLogins.Select(x => new ExternalLoginState.ExternalLoginProvider
                {
                    DisplayName = x.DisplayName,
                    Scheme = x.AuthenticationScheme
                }).ToList()
            };
        }
    }
}
