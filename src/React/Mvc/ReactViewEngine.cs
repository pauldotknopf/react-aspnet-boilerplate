using Microsoft.AspNet.Mvc.ViewEngines;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using Microsoft.AspNet.Mvc.Razor;
using Microsoft.AspNet.Mvc.Rendering;

namespace React.Mvc
{
    public class ReactViewEngine : IViewEngine
    {
        public ViewEngineResult FindPartialView(ActionContext context, string partialViewName)
        {
            return null;
            //return ViewEngineResult.Found(partialViewName, );
        }

        public ViewEngineResult FindView(ActionContext context, string viewName)
        {
            return null;
        }

        class ReactView : IView
        {
            public string Path
            {
                get; set;
            }

            public Task RenderAsync(ViewContext context)
            {
                return null;
            }
        }
    }
}
