using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Sample_BugTracker.API.DTO.Error.PartialUpdate
{
    public class DeadlineUpdateDTO
    {
        [Required(ErrorMessage = "Deadline of error is a required field")]
        public DateTime Deadline { get; set; }
    }
}