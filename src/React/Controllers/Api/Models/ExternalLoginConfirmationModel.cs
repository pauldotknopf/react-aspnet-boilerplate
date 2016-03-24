using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace React.Controllers.Api.Models
{
    public class ExternalLoginConfirmationModel
    {
        [JsonProperty("userName")]
        [Required]
        public string UserName { get; set; }

        [JsonProperty("email")]
        [EmailAddress]
        [Required]
        public string Email { get; set; }
    }
}
