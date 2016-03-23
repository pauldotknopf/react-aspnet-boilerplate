using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace React.Controllers.Api.Models
{
    public class ChangePasswordModel
    {
        [JsonProperty("oldPassword")]
        [Required]
        [DataType(DataType.Password)]
        public string OldPassword { get; set; }

        [JsonProperty("newPassword")]
        [Required]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
        public string NewPassword { get; set; }

        [JsonProperty("newPasswordConfirm")]
        [Compare("NewPassword", ErrorMessage = "The new password and confirmation password do not match.")]
        public string NewPasswordConfirm { get; set; }
    }
}
