using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using React.Models;

namespace React.Controllers.Home
{
    public class HomeController : BaseController
    {
        public HomeController(UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager)
            :base(userManager, 
                 signInManager)
        {
        }

        public async Task<IActionResult> Index(string greeting = "Hello!")
        {
            return View("js-{auto}", await BuildState());
        }

        [Route("about")]
        public async Task<IActionResult> About()
        {
            return View("js-{auto}", await BuildState());
        }

        [Route("contact")]
        public async Task<IActionResult> Contact()
        {
            return View("js-{auto}", await BuildState());
        }
    }
}
