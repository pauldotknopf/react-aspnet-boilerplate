using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json.Serialization;
using Newtonsoft.Json;

namespace React.Controllers.Api.Models
{
    public class ExternalLoginModel
    {
        [JsonProperty("provider")]
        public string Provider { get; set; }
    }
}
