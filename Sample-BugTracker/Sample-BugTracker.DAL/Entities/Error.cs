using Microsoft.AspNet.Identity.EntityFramework;
using Sample_BugTracker.DAL.Enumerations;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Sample_BugTracker.DAL.Entities
{
    public class Error
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public DateTime DateCreation { get; set; }

        public Status Status { get; set; }

        public Priority Priority { get; set; }

        public int ProjectId { get; set; }
        public virtual Project Project { get; set; }

        public string WorkerId { get; set; }
        public virtual AppUser Worker { get; set; }
    }
}
