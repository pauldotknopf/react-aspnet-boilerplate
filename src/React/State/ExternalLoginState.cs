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
        
        public class ExternalLoginProvider
        {
            [JsonProperty("scheme")]
            public string Scheme { get; set; }

            [JsonProperty("displayName")]
            public string DisplayName { get; set; }
        }
    }
}
