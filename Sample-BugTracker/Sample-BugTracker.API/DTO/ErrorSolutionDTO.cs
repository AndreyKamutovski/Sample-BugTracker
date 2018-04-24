using Sample_BugTracker.DAL.Enumerations;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Sample_BugTracker.API.DTO
{
    public class ErrorSolutionDTO
    {
        [Required(ErrorMessage = "ErrorId is a required field")]
        public int ErrorId { get; set; }

        public Status ErrorStatus { get; set; }


        [Required(ErrorMessage = "Solution error text is a required field")]
        public string Description { get; set; }

        [Required(ErrorMessage = "Date Solution of error is a required field")]
        public DateTime DateSolution { get; set; }
    }
}