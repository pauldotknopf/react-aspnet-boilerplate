using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace React.Models.Api
{
    public class User
    {
        [JsonProperty("id")]
        public string Id { get; set; }

        [JsonProperty("userName")]
        public string UserName { get; set; }

        [JsonProperty("email")]
        public string Email { get; set; }

        public static User From(ApplicationUser user)
        {
            return new User
            {
                Id = user.Id,
                UserName = user.UserName,
                Email = user.Email
            };
        }
    }
}
