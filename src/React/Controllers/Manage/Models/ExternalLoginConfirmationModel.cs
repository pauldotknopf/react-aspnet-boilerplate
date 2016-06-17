using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace React.Controllers.Manage.Models
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
