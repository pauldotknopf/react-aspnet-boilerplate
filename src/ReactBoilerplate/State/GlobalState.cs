using Newtonsoft.Json;

namespace ReactBoilerplate.State
{
    public class GlobalState
    {
        [JsonProperty("people")]
        public PeopleState People { get; set; }
    }
}
