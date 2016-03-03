using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using JavaScriptViewEngine;
using Microsoft.AspNet.Hosting;
using System.IO;

namespace React.Services
{
    public class ReactEnvironmentInitializer : IJsEngineInitializer
    {
        private IHostingEnvironment _hostingEnvironment;

        public ReactEnvironmentInitializer(IHostingEnvironment hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
        }

        public void Initialize(IJsEngine engine)
        {
            engine.ExecuteFile(Path.Combine(_hostingEnvironment.WebRootPath, "pack", "server.generated.js"));
        }
    }
}
