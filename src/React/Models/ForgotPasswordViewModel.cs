using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace React.Models
{
    public class ForgotPasswordViewModel
    {
        [EmailAddress]
        [Required]
        public string Email { get; set; }
    }
}
