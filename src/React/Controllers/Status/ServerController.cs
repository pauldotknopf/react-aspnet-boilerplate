using Microsoft.AspNet.Mvc;

namespace React.Controllers.Status
{
    public class StatusController : Controller
    {
        [Route("status/status/{statusCode}")]
        public IActionResult Status(int statusCode)
        {
            return View($"js-/statuscode{statusCode}");
        }
    }
}
