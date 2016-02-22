using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace React.Services
{
    public static class Utils
    {
        public static string GetResourceAsString(string resourceName, Type type)
        {
            var assembly = type.Assembly;
            return GetResourceAsString(resourceName, assembly);
        }
        
        public static string GetResourceAsString(string resourceName, Assembly assembly)
        {
            using (Stream stream = assembly.GetManifestResourceStream(resourceName))
            {
                if (stream == null)
                    throw new NullReferenceException(string.Format("No resource found for " + resourceName));

                using (var reader = new StreamReader(stream))
                    return reader.ReadToEnd();
            }
        }
        
        public static string GetFileTextContent(string path, Encoding encoding = null)
        {
            if (!File.Exists(path))
                throw new FileNotFoundException(path);
            
            using (var file = new StreamReader(path, encoding ?? Encoding.UTF8))
                return file.ReadToEnd();
        }
    }
}
