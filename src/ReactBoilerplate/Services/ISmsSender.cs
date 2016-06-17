using System.Threading.Tasks;

namespace ReactBoilerplate.Services
{
    public interface ISmsSender
    {
        Task SendSmsAsync(string number, string message);
    }
}
