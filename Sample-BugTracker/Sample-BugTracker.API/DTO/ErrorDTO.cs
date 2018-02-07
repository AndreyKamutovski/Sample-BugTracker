using Sample_BugTracker.DAL.Enumerations;
using System;
using System.ComponentModel.DataAnnotations;

namespace Sample_BugTracker.API.DTO
{
    public class ErrorDTO
    {
        [Required(ErrorMessage = "Title of error is a required field")]
        [MinLength(3)]
        [MaxLength(100)]
        public string Title { get; set; }

        [Required(ErrorMessage = "DateCreation of error is a required field")]
        public DateTime DateCreation { get; set; }

        [Required(ErrorMessage = "Status of error is a required field")]
        [Range(1, 3)]
        public Status Status { get; set; }

        [Required(ErrorMessage = "Priority of error is a required field")]
        [Range(1, 4)]
        public Priority Priority { get; set; }
    }
}