using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json.Serialization;
using Newtonsoft.Json;
using ReactBoilerplate.Models;

namespace ReactBoilerplate.State
{
    public class PeopleState
    {
        [JsonProperty("people")]
        public List<Person> People { get; set; } 
    }
}
