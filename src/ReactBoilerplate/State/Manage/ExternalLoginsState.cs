using System.Collections.Generic;
using Newtonsoft.Json;

namespace ReactBoilerplate.State.Manage
{
    public class ExternalLoginsState
    {
        public ExternalLoginsState()
        {
            CurrentLogins = new List<ExternalLogin>();
            OtherLogins = new List<ExternalLoginState.ExternalLoginProvider>();
        }

        [JsonProperty("currentLogins")]
        public List<ExternalLogin> CurrentLogins { get; set; } 

        [JsonProperty("otherLogins")]
        public List<ExternalLoginState.ExternalLoginProvider> OtherLogins { get; set; } 
        
        public class ExternalLogin
        {
            [JsonProperty("loginProvider")]
            public string LoginProvider { get; set; }

            [JsonProperty("loginProviderDisplayName")]
            public string LoginProviderDisplayName { get; set; }

            [JsonProperty("providerKey")]
            public string ProviderKey { get; set; }
        }
    }
}
