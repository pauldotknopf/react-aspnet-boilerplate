using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ReactBoilerplate.Models;
using ReactBoilerplate.State;

namespace ReactBoilerplate.Controllers.People
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
