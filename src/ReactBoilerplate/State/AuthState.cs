using Newtonsoft.Json;
using ReactBoilerplate.Models.Api;

namespace ReactBoilerplate.State
{
    public class AuthState
    {
        [JsonProperty("user")]
        public User User { get; set; }

        [JsonProperty("loggedIn")]
        public bool LoggedIn { get; set; }
    }
}
