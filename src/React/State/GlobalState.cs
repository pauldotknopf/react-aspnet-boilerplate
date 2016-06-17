using Newtonsoft.Json;

namespace React.State
{
    public class GlobalState
    {
        [JsonProperty("people")]
        public PeopleState People { get; set; }
    }
}
