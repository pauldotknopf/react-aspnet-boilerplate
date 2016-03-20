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
            // TODO: send email
            _logger.LogInformation($"Send email: {email} : {subject} : {message}");
            return Task.FromResult(0);
        }
    }
}
