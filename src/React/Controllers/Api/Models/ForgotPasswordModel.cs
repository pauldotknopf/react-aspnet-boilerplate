using System.ComponentModel.DataAnnotations;

namespace React.Controllers.Api.Models
{
    public class ForgotPasswordModel
    {
        [EmailAddress]
        [Required]
        public string Email { get; set; }
    }
}
