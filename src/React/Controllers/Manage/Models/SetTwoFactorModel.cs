using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json.Serialization;
using Newtonsoft.Json;

namespace React.Controllers.Manage.Models
{
    public class SetTwoFactorModel
    {
        [JsonProperty("enabled")]
        public bool Enabled { get; set; }
    }
}
