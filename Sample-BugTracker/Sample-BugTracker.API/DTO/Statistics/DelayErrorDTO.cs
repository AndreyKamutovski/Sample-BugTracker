using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Sample_BugTracker.API.DTO.Statistics
{
    public class DelayErrorDTO
    {
        [Required(ErrorMessage = "Delay errors is a required field")]
        public int Id { get; set; }

        [Required(ErrorMessage = "Delay errors is a required field")]
        public int Delay { get; set; }

        [Required(ErrorMessage = "Title is a required field")]
        public string Title { get; set; }

        [Required(ErrorMessage = "AvatarAssigneeBase64 is a required field")]
        public string AvatarAssigneeBase64 { get; set; }

        [Required(ErrorMessage = "AssigneeEmail is a required field")]
        public string AssigneeEmail { get; set; }

    }
}