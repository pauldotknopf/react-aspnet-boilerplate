using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace React.Services
{
    public class EmailSender : IEmailSender
    {
        ILogger _logger;

        public EmailSender(ILoggerFactory loggerFactory)
        {
            _logger = loggerFactory.CreateLogger<EmailSender>();
        }

        public Task SendEmailAsync(string email, string subject, string message)
        {
            _logger.LogInformation($"Send email:\nemail:{email}\nsubject:{subject}\nmessage:{message}");
            return Task.FromResult(0);
        }
    }
}
