using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using JavaScriptViewEngine;

namespace React.Services
{
    public class ReactEnvironmentInitializer : IJsEngineInitializer
    {
        public void Initialize(IJsEngine engine)
        {
            engine.Execute(@"
                var RenderView = function(path, model) {
                    return ""<html><head></head><body><strong>"" + model.Greeting + ""</strong> - <strong>"" + path + ""</strong></body>"";
                };

                var RenderPartialView = function(path, model) {
                    return ""<div><strong>"" + model.Greeting + ""</strong> - <strong>"" + path + ""</strong></div>"";
                };
            ");
        }
    }
}
