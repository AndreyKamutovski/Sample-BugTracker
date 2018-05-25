using Microsoft.AspNet.Identity.EntityFramework;
using Sample_BugTracker.DAL.Enumerations;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Sample_BugTracker.DAL.Entities
{
    public class Error
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public DateTime? DateCreation { get; set; }

        public DateTime? Deadline { get; set; }

        public Status Status { get; set; }

        public Priority Priority { get; set; }

        public Classification Classification { get; set; }

        public int ProjectId { get; set; }
        public virtual Project Project { get; set; }

        public string AuthorId { get; set; }
        public virtual AppUser Author { get; set; }

        public string AssigneeId { get; set; }
        public virtual AppUser Assignee { get; set; }

        public virtual ErrorSolution Solution { get; set; }

        public virtual ICollection<ErrorAttachment> Attachments { get; set; }

        public Error()
        {
            Attachments = new List<ErrorAttachment>();
        }
    }
}
