using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace React.Services
{
    public class JavascriptEngineFactory : IJavascriptEngineFactory
    {
        private IJavascriptEngineInitializer _engineInitializer;
        protected readonly ConcurrentDictionary<int, IJsEngine> _engines = new ConcurrentDictionary<int, IJsEngine>();
        private bool _disposed = false;
        private object _lock = new object();

        public JavascriptEngineFactory(IJavascriptEngineInitializer engineInitializer)
        {
            _engineInitializer = engineInitializer;
        }
        
        public virtual IJsEngine GetEngineForCurrentThread()
        {
            EnsureValidState();
            return _engines.GetOrAdd(Thread.CurrentThread.ManagedThreadId, id =>
            {
                var engine = new VroomJsEngine();
                _engineInitializer.Initialize(engine);
                return engine;
            });
        }
        
        public virtual void DisposeEngineForCurrentThread()
        {
            IJsEngine engine;
            if (_engines.TryRemove(Thread.CurrentThread.ManagedThreadId, out engine))
                if (engine != null)
                    engine.Dispose();
        }
        
        public void EnsureValidState()
        {
            if (_disposed)
                throw new ObjectDisposedException(GetType().Name);
        }

        public void Dispose()
        {
            if (_disposed) return;

            lock (_lock)
            {
                if (_disposed) return;
                _disposed = true;
            }
            
            foreach (var engine in _engines)
                if (engine.Value != null)
                    engine.Value.Dispose();
        }
    }
}
