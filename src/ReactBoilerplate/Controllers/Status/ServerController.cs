using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace ReactBoilerplate.Controllers.Status
{
    public class StatusController : BaseController
    {
        [Route("status/status/{statusCode}")]
        public async Task<IActionResult> Status(int statusCode)
        {
            return View($"js-/statuscode{statusCode}", await BuildState());
        }
    }
}
