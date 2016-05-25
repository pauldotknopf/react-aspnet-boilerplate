using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using React.Models;

namespace React.Controllers.Manage
{
    [Route("manage")]
    public class ServerController : BaseController
    {
        public ServerController(UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager)
            :base(userManager, 
                 signInManager)
        {
        }

        public async Task<ActionResult> Index()
        {
            return View("js-{auto}", await BuildState());
        }

        [Route("security")]
        public async Task<IActionResult> Security()
        {
            return View("js-{auto}", await BuildState());
        }

        [Route("email")]
        public async Task<IActionResult> Email()
        {
            return View("js-{auto}", await BuildState());
        }

        [Route("changepassword")]
        public async Task<ActionResult> ChangePassword()
        {
            return View("js-{auto}", await BuildState());
        }

        [Route("logins")]
        public async Task<ActionResult> Logins()
        {
            return View("js-{auto}", await BuildState());
        }
    }
}
