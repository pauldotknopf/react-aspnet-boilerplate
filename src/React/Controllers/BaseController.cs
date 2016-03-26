using Microsoft.AspNet.Mvc;
using System.Threading.Tasks;
using React.State;

namespace React.Controllers
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
