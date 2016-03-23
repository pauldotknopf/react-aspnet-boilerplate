using Microsoft.AspNet.Mvc;
using System.Threading.Tasks;
using Microsoft.AspNet.Authorization;
using Microsoft.AspNet.Identity;
using Microsoft.Data.Entity.Metadata.Internal;
using React.Controllers.Api.Models;
using React.Models;
using React.Services;

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
    }
}
