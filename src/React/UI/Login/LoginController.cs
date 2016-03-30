using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using IdentityModel;
using IdentityServer4.Core;
using IdentityServer4.Core.Services;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Mvc;
using React.Models;

namespace React.UI.Login
{
    public class LoginController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly SignInInteraction _signInInteraction;

        public LoginController(
            UserManager<ApplicationUser> userManager, 
            SignInManager<ApplicationUser> signInManager,
            SignInInteraction signInInteraction)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _signInInteraction = signInInteraction;
        }

        [HttpGet(Constants.RoutePaths.Login, Name = "Login")]
        public async Task<IActionResult> Index(string id)
        {
            var vm = new LoginViewModel();

            if (id != null)
            {
                var request = await _signInInteraction.GetRequestAsync(id);
                if (request != null)
                {
                    vm.Username = request.LoginHint;
                    vm.SignInId = id;
                }
            }

            return View(vm);
        }

        [HttpPost(Constants.RoutePaths.Login)]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Index(LoginInputModel model)
        {
            if (ModelState.IsValid)
            {
                var user = await _userManager.FindByNameAsync(model.Username);
                if (user != null)
                {
                    var result = await _signInManager.PasswordSignInAsync(model.Username, model.Password, model.RememberLogin, false);
                    if (result == Microsoft.AspNet.Identity.SignInResult.Success)
                    {
                        if (model.SignInId != null)
                        {
                            return new SignInResult(model.SignInId);
                        }

                        return Redirect("~/");
                    }
                }
                
                //if(user != null && await _userManager.CheckPasswordAsync(user, model.Password))
                //{
                //    //var name = user.Claims.Where(x => x.Type == JwtClaimTypes.Name).Select(x => x.Value).FirstOrDefault() ?? user.Username;

                //    var claims = new Claim[] {
                //        new Claim(JwtClaimTypes.Subject, user.Id),
                //        new Claim(JwtClaimTypes.Name, user.UserName),
                //        new Claim(JwtClaimTypes.IdentityProvider, "idsvr"),
                //        new Claim(JwtClaimTypes.AuthenticationTime, DateTime.UtcNow.ToEpochTime().ToString()),
                //    };
                //    var ci = new ClaimsIdentity(claims, "password", JwtClaimTypes.Name, JwtClaimTypes.Role);
                //    var cp = new ClaimsPrincipal(ci);

                //    await HttpContext.Authentication.SignInAsync(Constants.PrimaryAuthenticationType, cp);

                   
                //}

                ModelState.AddModelError("", "Invalid username or password.");
            }

            var vm = new LoginViewModel(model);
            return View(vm);
        }
    }
}
