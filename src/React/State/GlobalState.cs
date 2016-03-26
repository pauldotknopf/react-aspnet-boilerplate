using Newtonsoft.Json;

namespace React.State
{
    public class GlobalState
    {
        public GlobalState()
        {
            Auth = new AuthState();
            ExternalLogin = new ExternalLoginState();
        }

        [JsonProperty("auth")]
        public AuthState Auth { get; set; }

        [JsonProperty("externalLogin")]
        public ExternalLoginState ExternalLogin { get; set; }

        public object temp { get; set; }
    }
}
