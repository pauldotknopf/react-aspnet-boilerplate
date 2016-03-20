using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace React.Models
{
    public class LoginViewModel
    {
        [JsonProperty("userName")]
        [Required]
        public string UserName { get; set; }

        [JsonProperty("password")]
        [Required]
        public string Password { get; set; }
        
        [JsonProperty("rememberMe")]
        public bool RememberMe { get; set; }
    }
}
