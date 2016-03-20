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
            return View("js-/register", await BuildState());
        }

        [Route("login")]
        public async Task<IActionResult> Login()
        {
            return View("js-/login", await BuildState());
        }
    }
}
