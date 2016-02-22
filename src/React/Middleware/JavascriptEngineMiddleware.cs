using Microsoft.AspNet.Builder;
using Microsoft.AspNet.Http;
using React.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace React.Middleware
{
    public class JavascriptEngineMiddleware
    {
        private readonly RequestDelegate _next;
        private IJavascriptEngineFactory _javascriptEngineFactory;

        public JavascriptEngineMiddleware(RequestDelegate next, 
            IJavascriptEngineFactory javscriptEngineFactory)
        {
            _next = next;
            _javascriptEngineFactory = javscriptEngineFactory;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                var engine = _javascriptEngineFactory.GetEngineForCurrentThread();

                context.Items["JsEngine"] = engine;

                await _next(context);
            }
            finally
            {
                _javascriptEngineFactory.DisposeEngineForCurrentThread();
            }
        }
    }
}
