using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json.Serialization;
using Newtonsoft.Json;

namespace React.Models
{
    public class Person
    {
        static Person()
        {
            Samples = new List<Person>
            {
                new Person
                {
                    Name = "Paul Knopf",
                    Bio = "A software developer..."
                },
                new Person
                {
                    Name = "Bernie Sanders",
                    Bio = "A democratic presidential candidate."
                },
                new Person
                {
                    Name = "Donal Trump",
                    Bio = "A rascist demagogue"
                }
            };
        }
        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("bio")]
        public string Bio { get; set; }

        public static List<Person> Samples { get; private set; } 
    }
}
