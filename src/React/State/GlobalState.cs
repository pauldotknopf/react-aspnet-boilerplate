using Newtonsoft.Json;
using React.Models.Api;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace React.ViewModels
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
