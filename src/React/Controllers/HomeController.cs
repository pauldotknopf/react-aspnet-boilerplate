using Microsoft.AspNet.Mvc;

namespace React.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View("js-/");
        }

        public IActionResult About()
        {
            return View("js-/about");
        }
    }
}
