using Newtonsoft.Json;
using React.Models.Api;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace React.ViewModels
{
    public class StateViewModel
    {
        public StateViewModel()
        {
            Auth = new AuthViewModel();
        }

        [JsonProperty("auth")]
        public AuthViewModel Auth { get; set; }
    }
}
