using System.ComponentModel.DataAnnotations;

namespace ReactBoilerplate.Controllers.Account.Models
{
    public class ForgotPasswordModel
    {
        [EmailAddress]
        [Required]
        public string Email { get; set; }
    }
}
