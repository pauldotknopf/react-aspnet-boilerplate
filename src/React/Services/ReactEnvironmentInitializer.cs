using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using JavaScriptViewEngine;
using Microsoft.AspNet.Hosting;
using System.IO;
using Microsoft.Extensions.Logging;

namespace React.Services
{
    public class ReactEnvironmentInitializer : IJsEngineInitializer
    {
        private IHostingEnvironment _hostingEnvironment;
        private ILogger _logger;

        public ReactEnvironmentInitializer(IHostingEnvironment hostingEnvironment, ILoggerFactory loggerFactory)
        {
            _hostingEnvironment = hostingEnvironment;
            _logger = loggerFactory.CreateLogger<ReactEnvironmentInitializer>();
        }

        public void Initialize(IJsEngine engine)
        {
            try
            {
                engine.ExecuteFile(Path.Combine(_hostingEnvironment.WebRootPath, "pack", "server.generated.js"));
            }
            catch (Exception ex)
            {
                _logger.LogError("Could not initialize the React server-side environment." + Environment.NewLine + ex.Message);
            }
        }
    }
}
