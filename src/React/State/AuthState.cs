using Newtonsoft.Json;
using React.Models.Api;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace React.ViewModels
{
    public class AuthState
    {
        [JsonProperty("user")]
        public User User { get; set; }

        [JsonProperty("loggedIn")]
        public bool LoggedIn { get; set; }
    }
}
