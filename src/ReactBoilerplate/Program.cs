using System.Collections.Generic;
using System.IO;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;

namespace ReactBoilerplate
{
    public class Program
    {
        private static readonly Dictionary<string, string> defaults = 
                    new Dictionary<string, string> {
                        { WebHostDefaults.EnvironmentKey, "development" }
                    };
        public static void Main(string[] args)
        {
            var config = new ConfigurationBuilder()
                .AddInMemoryCollection(defaults)
                .AddCommandLine(args)
                .AddEnvironmentVariables(prefix: "ASPNETCORE_")
                .Build();
                
            var host = new WebHostBuilder()
                .UseConfiguration(config)
                .UseKestrel()
                .UseContentRoot(Directory.GetCurrentDirectory())
                .UseIISIntegration()
                .UseStartup<Startup>()
                .Build();
            host.Run();
        }
    }
}
