using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Sample_BugTracker.API.DTO
{
    public class PortalDTO
    {
        [Required(ErrorMessage = "Title of portal is a required")]
        [MinLength(3)]
        [MaxLength(100)]
        public string Title { get; set; }

        public UserDTO Owner { get; set; }
    }
}