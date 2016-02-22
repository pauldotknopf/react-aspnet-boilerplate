namespace React.Services
{
    public class JavascriptEngineInitializer : IJavascriptEngineInitializer
    {
        public void Initialize(IJsEngine engine)
        {
            engine.Execute("var RenderView = function(path, model) { return \"view\"}");
            engine.Execute("var RenderPartialView = function(path, model) { return \"partialView\"}");
        }
    }
}
