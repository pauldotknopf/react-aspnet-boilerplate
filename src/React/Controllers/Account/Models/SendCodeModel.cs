using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace React.Controllers.Account.Models
{
    public class SendCodeModel
    {
        [Required]
        [JsonProperty("provider")]
        public string Provider { get; set; }

        [JsonProperty("remember")]
        public bool Remember { get; set; }
    }
}
