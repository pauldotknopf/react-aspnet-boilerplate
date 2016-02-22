using Microsoft.AspNet.Mvc.ViewEngines;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using Microsoft.AspNet.Mvc.Razor;
using Microsoft.AspNet.Mvc.Rendering;
using React.Services;

namespace React.Mvc
{
    public class ReactViewEngine : IViewEngine
    {
        public ViewEngineResult FindPartialView(ActionContext context, string partialViewName)
        {
            return ViewEngineResult.Found(partialViewName, new ReactView { FunctionName = "RenderPartialView", Path=partialViewName });
        }

        public ViewEngineResult FindView(ActionContext context, string viewName)
        {
            return ViewEngineResult.Found(viewName, new ReactView { FunctionName = "RenderView", Path = viewName });
        }

        class ReactView : IView
        {
            public string Path { get; set; }

            public string FunctionName { get; set; }

            public async Task RenderAsync(ViewContext context)
            {
                var jsEngine = context.HttpContext.Request.HttpContext.Items["JsEngine"] as IJsEngine;

                if (jsEngine == null) throw new Exception("Couldn't get IJsEngine from the context request items.");
                
                var result = (string)jsEngine.CallFunction(FunctionName, Path, context.ViewData.Model);

                await context.Writer.WriteAsync(result);
            }
        }
    }
}
