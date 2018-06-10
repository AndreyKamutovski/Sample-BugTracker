using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Sample_BugTracker.API.DTO.Statistics
{
    public class MyErrorReportDTO
    {
        [Required(ErrorMessage = "Error: Id is a required field")]
        public int Id { get; set; }

        [Required(ErrorMessage = "Error: Title is a required field")]
        public string Title { get; set; }

        [Required(ErrorMessage = "Error: PortalName is a required field")]
        public string ProjectName { get; set; }

        [Required(ErrorMessage = "Error: Deadline is a required field")]
        public DateTime? Deadline { get; set; }
    }
}