using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Sample_BugTracker.API.DTO.Statistics
{
    public class MyWorkReportDTO
    {
        [Required(ErrorMessage = "ClosedErrorCount is a required field")]
        public int ClosedErrorCount { get; set; }

        [Required(ErrorMessage = "OpenErrorCount is a required field")]
        public int OpenErrorCount { get; set; }
    }
}