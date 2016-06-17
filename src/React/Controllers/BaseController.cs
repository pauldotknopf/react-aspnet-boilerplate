using System.Globalization;
using System.Linq;
using React.Models;
using React.Models.Api;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using React.State;

namespace React.Controllers
{
    public class BaseController : Controller
    {
        UserManager<ApplicationUser> _userManager;
        SignInManager<ApplicationUser> _signInManager;

        public BaseController(UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        protected async Task<GlobalState> BuildState()
        {
            var state = new GlobalState();

            var user = await GetCurrentUserAsync();

            if (user != null)
            {
                state.Auth.User = Models.Api.User.From(user);
                state.Auth.LoggedIn = true;
            }

            state.ExternalLogin.LoginProviders
                .AddRange(_signInManager.GetExternalAuthenticationSchemes()
                .Select(x => new ExternalLoginState.ExternalLoginProvider
                {
                    Scheme = x.AuthenticationScheme,
                    DisplayName = x.DisplayName
                }));

            return state;
        }

        protected async Task<ApplicationUser> GetCurrentUserAsync()
        {
            if (!User.Identity.IsAuthenticated)
                return null;

            var user = await _userManager.GetUserAsync(HttpContext.User);

            if (user == null)
            {
                await _signInManager.SignOutAsync();
                return null;
            }

            return user;
        }

        protected IActionResult RedirectToLocal(string returnUrl)
        {
            return Redirect(Url.IsLocalUrl(returnUrl) ? returnUrl : "/");
        }

        protected object GetModelState()
        {
            return ModelState.ToDictionary(x => string.IsNullOrEmpty(x.Key) ? "_global" : ToCamelCase(x.Key), x => x.Value.Errors.Select(y => y.ErrorMessage));
        }

        protected string ToCamelCase(string s)
        {
            if (string.IsNullOrEmpty(s))
                return s;

            if (!char.IsUpper(s[0]))
                return s;

            string camelCase = char.ToLower(s[0]).ToString();
            if (s.Length > 1)
                camelCase += s.Substring(1);

            return camelCase;
        }
    }
}
