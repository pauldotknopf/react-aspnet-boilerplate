using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ReactBoilerplate.State;

namespace ReactBoilerplate.Controllers
{
    public class BaseController : Controller
    {
        protected async Task<GlobalState> BuildState()
        {
            var state = new GlobalState();
            
            return state;
        }
    }
}
