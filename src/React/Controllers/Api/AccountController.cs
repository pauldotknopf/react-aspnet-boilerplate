using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Mvc;
using Microsoft.Extensions.OptionsModel;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json.Serialization;
using React.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace React.Controllers.Api
{
    [Route("api/account")]
    public class AccountController : BaseApiController
    {
        UserManager<ApplicationUser> _userManager;
        SignInManager<ApplicationUser> _signInManager;

        public AccountController(UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [Route("register")]
        [HttpPost]
        public async Task<object> Register([FromBody]RegisterModel model)
        {
            if (ModelState.IsValid)
            {
                var user = new ApplicationUser { UserName = model.UserName, Email = model.Email };
                var result = await _userManager.CreateAsync(user, model.Password);
                if (result.Succeeded)
                {
                    await _signInManager.SignInAsync(user, isPersistent: false);
                    return new
                    {
                        success = true,
                        user = Models.Api.User.From(user)
                    };
                }
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(string.Empty, error.Description);
                }
            }

            return new
            {
                success = false,
                errors = GetModelState()
            };
        }

        [Route("login")]
        public async Task<object> Login([FromBody]LoginViewModel model)
        {
            if (ModelState.IsValid)
            {
                var user = await _userManager.FindByNameAsync(model.UserName);
                if(user == null)
                {
                    ModelState.AddModelError("UserName", "No user found with the given user name.");
                    return new
                    {
                        success = false,
                        errors = GetModelState()
                    };
                }

                var result = await _signInManager.PasswordSignInAsync(user, model.Password, model.RememberMe, lockoutOnFailure: false);
                if (result.Succeeded)
                {
                    return new
                    {
                        success = true,
                        user = Models.Api.User.From(user)
                    };
                }
                if (result.RequiresTwoFactor)
                {
                    // maybe later?
                    throw new NotSupportedException();
                }
                if (result.IsLockedOut)
                {
                    ModelState.AddModelError(string.Empty, "You are currently locked out.");
                    return new
                    {
                        success = false,
                        errors = GetModelState()
                    };
                }
                else
                {
                    ModelState.AddModelError(string.Empty, "Invalid login attempt.");
                    return new
                    {
                        success = false,
                        errors = GetModelState()
                    };
                }
            }

            return new
            {
                success = false,
                errors = GetModelState()
            };
        }

        [Route("logoff")]
        [HttpPost]
        public async Task<object> LogOff()
        {
            await _signInManager.SignOutAsync();
            return new
            {
                success = true
            };
        }
    }
}
