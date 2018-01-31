using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNet.Identity.EntityFramework;

namespace Sample_BugTracker.DAL.Entities
{
    public enum Status
    {
        Open = 1,
        Decided,
        Close
    }

    public enum Priority
    {
        Critical = 1,
        High,
        Middle,
        Low
    }

    public class Error
    {
        public Guid Id { get; set; }

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

        public Guid ProjectId { get; set; }
        public Project Project { get; set; }

        public string IdentityUserId { get; set; }
        public IdentityUser Worker { get; set; }
    }
}
