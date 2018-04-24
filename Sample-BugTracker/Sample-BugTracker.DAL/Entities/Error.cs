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

        public string ErrorAuthorId { get; set; }
        public virtual AppUser ErrorAuthor { get; set; }

        public string ErrorResponsibleId { get; set; }
        public virtual AppUser ErrorResponsible { get; set; }

        public virtual ErrorSolution Solution { get; set; }

        public virtual ICollection<Attachment> Attachments { get; set; }

    }
}
