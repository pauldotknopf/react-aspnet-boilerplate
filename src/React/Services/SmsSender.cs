using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;

namespace React.Services
{
    public class SmsSender : ISmsSender
    {
        ILogger _logger;

        public SmsSender(ILoggerFactory loggerFactory)
        {
            _logger = loggerFactory.CreateLogger<EmailSender>();
        }

        public Task SendSmsAsync(string number, string message)
        {
            _logger.LogInformation($"Send sms:\nnumber:{number}\nmessage:{message}");
            return Task.FromResult(0);
        }
    }
}
