using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json.Serialization;
using React.Models;
using Newtonsoft.Json;

namespace React.State
{
    public class PeopleState
    {
        [JsonProperty("people")]
        public List<Person> People { get; set; } 
    }
}
