using Newtonsoft.Json;

namespace ReactBoilerplate.Controllers.Manage.Models
{
    public class SetTwoFactorModel
    {
        [JsonProperty("enabled")]
        public bool Enabled { get; set; }
    }
}
