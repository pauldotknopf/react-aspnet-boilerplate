using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace React.Models
{
    public class RegisterModel
    {
        [JsonProperty("userName")]
        [Required]
        public string UserName { get; set; }

        [JsonProperty("email")]
        [EmailAddress]
        [Required]
        public string Email { get; set; }

        [JsonProperty("password")]
        [Required]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
        public string Password { get; set; }
        
        [JsonProperty("passwordConfirm")]
        [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
        public string PasswordConfirm { get; set; }
    }
}
