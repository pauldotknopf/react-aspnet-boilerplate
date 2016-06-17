using System.Threading.Tasks;

namespace ReactBoilerplate.Services
{
    public interface IEmailSender
    {
        Task SendEmailAsync(string email, string subject, string message);
    }
}
