using System;
using System.Threading;
using Microsoft.AspNetCore.Mvc;
using React.Models;

namespace React.Controllers.People
{
    [Route("api/people")]
    public class ApiController : BaseController
    {
        [Route("load")]
        public object Load()
        {
            Thread.Sleep(TimeSpan.FromSeconds(1)); // simulate heavy load...
            if(new Random().Next(1,5) == 1)
                throw new Exception("The exception occurs randomly...");
            return Person.Samples;
        }
    }
}
