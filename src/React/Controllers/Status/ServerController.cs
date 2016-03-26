using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Mvc;
using React.Models;
using System.Threading.Tasks;

namespace React.Controllers.Status
{
    public class StatusController : BaseController
    {
        public StatusController(UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager)
            :base(userManager, signInManager)
        {
        }

        [Route("status/status/{statusCode}")]
        public async Task<IActionResult> Status(int statusCode)
        {
            return View($"js-/statuscode{statusCode}", await BuildState());
        }
    }
}
