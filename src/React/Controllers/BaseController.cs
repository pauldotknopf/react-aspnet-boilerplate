using System.Linq;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Mvc;
using React.Models;
using React.Models.Api;
using System.Security.Claims;
using System.Threading.Tasks;
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
                state.Auth.User = user;
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

        protected async Task<User> GetCurrentUserAsync()
        {
            if (!User.Identity.IsAuthenticated)
                return null;

            var user = await _userManager.FindByIdAsync(HttpContext.User.GetUserId());

            if (user == null)
            {
                await _signInManager.SignOutAsync();
                return null;
            }

            return Models.Api.User.From(user);
        }
    }
}
