using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Sample_BugTracker.API.DTO.Statistics
{
    public class TopUserDTO
    {
        [Required(ErrorMessage = "Count errors is a required field")]
        public int Count { get; set; }

        [Required(ErrorMessage = "Email is a required field")]
        public string Email { get; set; }

        [Required(ErrorMessage = "AvatarBase64 is a required field")]
        public string AvatarBase64 { get; set; }
    }
}