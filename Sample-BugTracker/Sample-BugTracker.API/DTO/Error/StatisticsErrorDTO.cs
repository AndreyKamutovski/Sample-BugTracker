using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Sample_BugTracker.API.DTO.Error
{
    public class StatisticsErrorDTO
    {
        [Required(ErrorMessage = "Total count of error is a required field")]
        public int Total { get; set; }

        [Required(ErrorMessage = "ClosedErrorCount is a required field")]
        public int ClosedErrorCount { get; set; }

        [Required(ErrorMessage = "OpenErrorCount is a required field")]
        public int OpenErrorCount { get; set; }

        [Required(ErrorMessage = "ProgressPercentage is a required field")]
        public int ProgressPercentage { get; set; }
    }
}