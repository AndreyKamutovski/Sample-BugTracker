using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Sample_BugTracker.API.DTO
{
    public class UpdateErrorDeadlineDTO
    {
        [Required(ErrorMessage = "ErrorId is a required field")]
        public int ErrorId { get; set; }

        [Required(ErrorMessage = "Deadline of error is a required field")]
        public DateTime? Deadline { get; set; }
    }
}