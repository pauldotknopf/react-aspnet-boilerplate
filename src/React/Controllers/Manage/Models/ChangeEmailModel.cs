using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json.Serialization;
using Newtonsoft.Json;

namespace React.Controllers.Manage.Models
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
