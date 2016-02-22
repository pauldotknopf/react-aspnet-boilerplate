using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VroomJs;

namespace React.Services
{
    public class VroomJsEngine : IJsEngine
    {
        private static readonly Lazy<JsEngine> _jsEngine = new Lazy<JsEngine>(() => new JsEngine());
        private readonly JsContext _context;
        private object _lock = new object();
        private bool _disposed = false;
        
        public VroomJsEngine()
        {
            try
            {
                _context = _jsEngine.Value.CreateContext();
            }
            catch (Exception ex)
            {
                throw new Exception("V8 engine context couldn't be created.", ex);
            }
        }

        public void Dispose()
        {
            if (!_disposed)
            {
                lock(_lock)
                {
                    if (_disposed) return;
                    _disposed = true;
                }

                _context.Dispose();
            }
        }
    }
}
