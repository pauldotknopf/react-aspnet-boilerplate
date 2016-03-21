using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Mvc;
using Microsoft.Extensions.OptionsModel;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json.Serialization;
using React.Models;
using React.Services;
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
        IEmailSender _emailSender;

        public AccountController(UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            IEmailSender emailSender)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _emailSender = emailSender;
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

        [Route("forgotpassword")]
        [HttpPost]
        public async Task<object> ForgotPassword([FromBody]ForgotPasswordViewModel model)
        {
            if (ModelState.IsValid)
            {
                var user = await _userManager.FindByEmailAsync(model.Email);
                if (user == null || !(await _userManager.IsEmailConfirmedAsync(user)))
                {
                    // Don't reveal that the user does not exist or is not confirmed
                    return new
                    {
                        success = true
                    };
                }
                
                var code = await _userManager.GeneratePasswordResetTokenAsync(user);
                var callbackUrl = Url.Action("ResetPassword", "Account", new { userId = user.Id, code = code }, protocol: HttpContext.Request.Scheme);
                await _emailSender.SendEmailAsync(model.Email, "Reset Password",
                   "Please reset your password by clicking here: <a href=\"" + callbackUrl + "\">link</a>");

                return new
                {
                    success = true
                };
            }

            return new
            {
                success = false,
                errors = GetModelState()
            };
        }

        [Route("resetpassword")]
        [HttpPost]
        public async Task<object> ResetPassword([FromBody]ResetPasswordViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return new
                {
                    success = false,
                    errors = GetModelState()
                };
            }
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
            {
                // Don't reveal that the user does not exist
                return new
                {
                    success = true
                };
            }
            var result = await _userManager.ResetPasswordAsync(user, model.Code, model.Password);
            if (result.Succeeded)
            {
                return new
                {
                    success = true
                };
            }

            foreach (var error in result.Errors)
            {
                ModelState.AddModelError(string.Empty, error.Description);
            }

            return new
            {
                success = false,
                errors = GetModelState()
            };
        }
    }
}
