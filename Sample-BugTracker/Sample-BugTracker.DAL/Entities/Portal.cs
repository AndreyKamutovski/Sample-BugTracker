using Microsoft.AspNet.Identity.EntityFramework;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Sample_BugTracker.DAL.Entities
{
    public class Portal
    {
        [Key]
        [ForeignKey("Owner")]
        public string Id { get; set; }

        public string Title { get; set; }

        public virtual AppUser Owner { get; set; }

        public virtual ICollection<Project> Projects { get; set; }
    }
}
