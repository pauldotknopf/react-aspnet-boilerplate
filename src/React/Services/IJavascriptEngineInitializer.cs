using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace React.Services
{
    public interface IJavascriptEngineInitializer
    {
        void Initialize(IJsEngine engine);
    }
}
