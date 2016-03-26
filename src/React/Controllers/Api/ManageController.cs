using Microsoft.AspNet.Mvc;
using System.Threading.Tasks;
using Microsoft.AspNet.Authorization;
using Microsoft.AspNet.Identity;
using Microsoft.Data.Entity.Metadata.Internal;
using React.Controllers.Api.Models;
using React.Models;
using React.Services;
using React.State;
using React.State.Manage;
using System.Linq;
using System.Runtime.InteropServices;

namespace React.Controllers.Api
{
    [Authorize]
    [Route("api/manage")]
    public class ManageController : BaseApiController
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;

        public ManageController(UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager)
            :base(userManager, signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [Route("changepassword")]
        public async Task<object> ChangePassword([FromBody]ChangePasswordModel model)
        {
            if (!ModelState.IsValid)
            {
                return new
                {
                    success = false,
                    errors = GetModelState()
                };
            }
            var user = await GetCurrentUserAsync();
            var result = await _userManager.ChangePasswordAsync(user, model.OldPassword, model.NewPassword);
            if (result.Succeeded)
            {
                await _signInManager.SignInAsync(user, isPersistent: false);
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

        [Route("externallogins")]
        public async Task<object> ExternalLogins()
        {
            var user = await GetCurrentUserAsync();
            var userLogins = await _userManager.GetLoginsAsync(user);
            foreach (var userLogin in userLogins)
            {
                if (string.IsNullOrEmpty(userLogin.ProviderDisplayName))
                {
                    userLogin.ProviderDisplayName =
                    _signInManager.GetExternalAuthenticationSchemes()
                        .SingleOrDefault(x => x.AuthenticationScheme.Equals(userLogin.LoginProvider))?
                        .DisplayName;
                    if (string.IsNullOrEmpty(userLogin.ProviderDisplayName))
                    {
                        userLogin.ProviderDisplayName = userLogin.LoginProvider;
                    }
                }
            }
            var otherLogins = _signInManager.GetExternalAuthenticationSchemes().Where(auth => userLogins.All(ul => auth.AuthenticationScheme != ul.LoginProvider)).ToList();

            return new ExternalLoginsState
            {
                CurrentLogins = userLogins.Select(x => new ExternalLoginsState.ExternalLogin {ProviderKey = x.ProviderKey, LoginProvider = x.LoginProvider, LoginProviderDisplayName = x.ProviderDisplayName}).ToList(),
                OtherLogins = otherLogins.Select(x => new ExternalLoginState.ExternalLoginProvider {DisplayName = x.DisplayName, Scheme = x.AuthenticationScheme}).ToList()
            };
        }
    }
}
