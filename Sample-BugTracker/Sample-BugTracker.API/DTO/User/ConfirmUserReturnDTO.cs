using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Sample_BugTracker.API.DTO.User
{
    public class ConfirmUserReturnDTO
    {

        [Required(ErrorMessage = "The portalName is required")]
        public string portalName { get; set; }


        [Required(ErrorMessage = "The email address is required")]
        [DataType(DataType.EmailAddress)]
        [Display(Name = "Email address")]
        [EmailAddress(ErrorMessage = "Invalid Email Address")]
        public string Email { get; set; }
    }
}