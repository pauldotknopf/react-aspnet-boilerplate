using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace React.Services
{
    public interface IJavascriptEngineFactory : IDisposable
    {
		IJsEngine GetEngineForCurrentThread();
        
        void DisposeEngineForCurrentThread();
    }
}
