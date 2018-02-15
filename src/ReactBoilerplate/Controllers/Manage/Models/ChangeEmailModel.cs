using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace ReactBoilerplate.Controllers.Manage.Models
{
    public class ChangeEmailModel
    {
        [JsonProperty("currentPassword")]
        [DataType(DataType.Password)]
        [Required]
        public string CurrentPassword { get; set; }

        [JsonProperty("email")]
        [EmailAddress]
        [Required]
        public string Email { get; set; }
        
        [JsonProperty("emailConfirm")]
        [Compare("Email", ErrorMessage = "The email and confirmation email do not match.")]
        public string EmailConfirm { get; set; }
    }
}
