using Sample_BugTracker.DAL.EF;
using Sample_BugTracker.DAL.Enumerations;
using Sample_BugTracker.DAL.Repositories;
using System;
using System.ComponentModel.DataAnnotations;

namespace Sample_BugTracker.API.DTO
{
    public class ErrorDTO
    {
        public int ErrorId { get; set; }

        [Required(ErrorMessage = "Title of error is a required field")]
        [MinLength(3)]
        [MaxLength(100)]
        public string Title { get; set; }

        [MaxLength(5000)]
        public string Description { get; set; }

        [Required(ErrorMessage = "DateCreation of error is a required field")]
        public DateTime DateCreation { get; set; }

        //[Required(ErrorMessage = "Deadline of error is a required field")]
        public DateTime? Deadline { get; set; }

        [Required(ErrorMessage = "Status of error is a required field")]
        [Range(1, 4)]
        public Status Status { get; set; }

        [Required(ErrorMessage = "Priority of error is a required field")]
        [Range(1, 4)]
        public Priority Priority { get; set; }

        [Required(ErrorMessage = "Priority of error is a required field")]
        [Range(1, 6)]
        public Classification Classification { get; set; }

        [DataType(DataType.EmailAddress)]
        [Display(Name = "Email address of error assignee")]
        [EmailAddress(ErrorMessage = "Invalid Email Address of error assignee")]
        public string EmailAssignee { get; set; }

        [DataType(DataType.EmailAddress)]
        [Display(Name = "Email address of error author")]
        [EmailAddress(ErrorMessage = "Invalid Email Address of error author")]
        public string EmailAuthor { get; set; }

        public ErrorSolutionDTO Solution { get; set; }

        public ErrorDTO()
        {

        }
    }
}