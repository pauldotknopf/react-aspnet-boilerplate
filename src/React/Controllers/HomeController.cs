using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using React.ViewModels;

namespace React.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index(string greeting = "Hello!")
        {
            return View(new GreetingViewModel { Greeting = greeting});
        }
    }
}
