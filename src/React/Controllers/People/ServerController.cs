using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using React.Models;
using React.State;

namespace React.Controllers.People
{
    public class ServerController : BaseController
    {
        [Route("people")]
        public async Task<ActionResult> People()
        {
            var state = await BuildState();
            // this will populate the redux store with the
            // appropriate state for an initial render with data.
            state.People = new PeopleState
            {
                People = Person.Samples
            };
            return View("js-{auto}", state);
        }
    }
}
