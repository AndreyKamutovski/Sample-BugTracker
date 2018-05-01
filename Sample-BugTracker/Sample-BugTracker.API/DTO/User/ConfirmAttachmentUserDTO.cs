using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Sample_BugTracker.API.DTO
{
    public class ConfirmAttachmentUserDTO
    {
        [Required(ErrorMessage = "The password is required")]
        [StringLength(100, ErrorMessage = "The value {0} must contain at least {2} characters.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Confirm password")]
        [Compare("Password", ErrorMessage = "The password and its confirmation do not match.")]
        public string ConfirmPassword { get; set; }

        [Required(ErrorMessage = "The guid is required")]
        public string guid { get; set; }
    }
}