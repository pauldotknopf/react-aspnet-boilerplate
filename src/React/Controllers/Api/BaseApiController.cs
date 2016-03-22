using Microsoft.AspNet.Mvc;
using React.Models;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;

namespace React.Controllers.Api
{
    public class BaseApiController : Controller
    {
        readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;

        public BaseApiController(UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        public object GetModelState()
        {
            return ModelState.ToDictionary(x => string.IsNullOrEmpty(x.Key) ? "_global" : ToCamelCase(x.Key), x => x.Value.Errors.Select(y => y.ErrorMessage));
        }

        protected string ToCamelCase(string s)
        {
            if (string.IsNullOrEmpty(s))
                return s;

            if (!char.IsUpper(s[0]))
                return s;

            string camelCase = char.ToLower(s[0], CultureInfo.InvariantCulture).ToString(CultureInfo.InvariantCulture);
            if (s.Length > 1)
                camelCase += s.Substring(1);

            return camelCase;
        }

        protected async Task<ApplicationUser> GetCurrentUserAsync()
        {
            if (!User.Identity.IsAuthenticated)
                return null;

            var user = await _userManager.FindByIdAsync(HttpContext.User.GetUserId());

            if (user == null)
            {
                await _signInManager.SignOutAsync();
                return null;
            }

            return user;
        }
    }
}
