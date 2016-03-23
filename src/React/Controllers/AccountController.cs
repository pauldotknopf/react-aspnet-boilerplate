using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Mvc;
using Newtonsoft.Json;
using React.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Authentication;
using Microsoft.AspNet.Authentication.OAuth;

namespace React.Controllers
{
    public class AccountController : BaseController
    {
        UserManager<ApplicationUser> _userManager;
        SignInManager<ApplicationUser> _signInManager;

        public AccountController(UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager)
            :base(userManager, 
                 signInManager)
        {
            _userManager = userManager;
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

        [Route("resetpassword")]
        public async Task<IActionResult> ResetPassword()
        {
            return View("js-{auto}", await BuildState());
        }

        [Route("confirmemail")]
        public async Task<IActionResult> ConfirmEmail(string userId, string code)
        {
            var state = await BuildState();

            if (userId == null || code == null)
            {
                state.temp = new
                {
                    confirmEmailSuccess = false
                };
                return View("js-{auto}", state);
            }

            var user = await _userManager.FindByIdAsync(userId);

            if (user == null)
            {
                state.temp = new
                {
                    confirmEmailSuccess = false
                };
                return View("js-{auto}", state);
            }

            var result = await _userManager.ConfirmEmailAsync(user, code);

            state.temp = new
            {
                confirmEmailSuccess = result.Succeeded
            };

            return View("js-{auto}", state);
        }

        [HttpGet]
        [Route("externallogincallback")]
        public async Task<IActionResult> ExternalLoginCallback(string provider, string returnUrl)
        {
            return null;
        }
    }
}
