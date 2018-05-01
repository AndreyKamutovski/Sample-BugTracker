using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Sample_BugTracker.API.DTO
{
    public class AttachUserDTO
    {
        [Required(ErrorMessage = "The email address is required")]
        [DataType(DataType.EmailAddress)]
        [EmailAddress(ErrorMessage = "Invalid Email Address")]
        public string Email { get; set; }

        [Required(ErrorMessage = "The roleName is required")]
        public string RoleName { get; set; }

        [Required(ErrorMessage = "The projectId is required")]
        public int ProjectId { get; set; }
    }
}