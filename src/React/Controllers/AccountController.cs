using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Mvc;
using React.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace React.Controllers
{
    public class AccountController : BaseController
    {
        public AccountController(UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager)
            :base(userManager, 
                 signInManager)
        {
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
    }
}
