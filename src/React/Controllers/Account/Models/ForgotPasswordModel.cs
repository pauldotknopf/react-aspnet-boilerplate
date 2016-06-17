using System.ComponentModel.DataAnnotations;

namespace React.Controllers.Account.Models
{
    public class ForgotPasswordModel
    {
        [EmailAddress]
        [Required]
        public string Email { get; set; }
    }
}
