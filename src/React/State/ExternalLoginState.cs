using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json.Serialization;
using Newtonsoft.Json;

namespace React.State
{
    public class ExternalLoginState
    {
        public ExternalLoginState()
        {
            LoginProviders = new List<ExternalLoginProvider>();
        }

        [JsonProperty("loginProviders")]
        public List<ExternalLoginProvider> LoginProviders { get; set; }
        
        [JsonProperty("externalAuthenticated")]
        public bool ExternalAuthenticated { get; set; }

        [JsonProperty("externalAuthenticatedProvider")]
        public ExternalLoginProvider ExternalAuthenticatedProvider { get; set; }

        [JsonProperty("requiresTwoFactor")]
        public bool RequiresTwoFactor { get; set; }

        [JsonProperty("lockedOut")]
        public bool LockedOut { get; set; }

        [JsonProperty("signedIn")]
        public bool SignedIn { get; set; }

        [JsonProperty("proposedEmail")]
        public string ProposedEmail { get; set; }

        [JsonProperty("proposedUserName")]
        public string ProposedUserName { get; set; }

        public class ExternalLoginProvider
        {
            [JsonProperty("scheme")]
            public string Scheme { get; set; }

            [JsonProperty("displayName")]
            public string DisplayName { get; set; }
        }
    }
}
