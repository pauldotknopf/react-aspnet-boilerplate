using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace React.Controllers
{
    public class StatusController : Controller
    {
        public IActionResult Status(int statusCode)
        {
            return View($"/statuscode{statusCode}");
        }
    }
}
