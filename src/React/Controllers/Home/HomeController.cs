using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace React.Controllers.Home
{
    public class HomeController : BaseController
    {
        public async Task<IActionResult> Index(string greeting = "Hello!")
        {
            return View("js-{auto}", await BuildState());
        }
    }
}
