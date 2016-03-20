using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;

namespace React.Controllers.Api
{
    public class BaseApiController : Controller
    {
        public object GetModelState()
        {
            return ModelState.ToDictionary(x => string.IsNullOrEmpty(x.Key) ? "_global" : ToCamelCase(x.Key), x => x.Value.Errors.Select(y => y.ErrorMessage));
        }

        protected string ToCamelCase(string s)
        {
            if (string.IsNullOrEmpty(s))
                return s;

            if (!char.IsUpper(s[0]))
                return s;

            string camelCase = char.ToLower(s[0], CultureInfo.InvariantCulture).ToString(CultureInfo.InvariantCulture);
            if (s.Length > 1)
                camelCase += s.Substring(1);

            return camelCase;
        }
    }
}
