using Newtonsoft.Json;

namespace React.State
{
    public class GlobalState
    {
        public GlobalState()
        {
            Auth = new AuthState();
        }

        [JsonProperty("auth")]
        public AuthState Auth { get; set; }

        public object temp { get; set; }
    }
}
