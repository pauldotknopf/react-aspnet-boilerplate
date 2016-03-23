using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Mvc;
using React.Models;
using React.Models.Api;
using React.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

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
