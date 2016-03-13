using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace React.Controllers
{
    public class AccountController : Controller
    {
        [Route("register")]
        public ActionResult Register()
        {
            return View("js-/register");
        }
    }
}
