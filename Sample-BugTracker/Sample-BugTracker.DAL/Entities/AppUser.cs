using Microsoft.AspNet.Identity.EntityFramework;
using System.Collections.Generic;

namespace Sample_BugTracker.DAL.Entities
{
    public class AppUser: IdentityUser
    {
        public virtual ICollection<Project> Projects { get; set; }
        public virtual ICollection<Error> Errors { get; set; }
        public virtual Portal Portal { get; set; }

        public string Avatar { get; set; }

        public AppUser(): base()
        {
            Projects = new List<Project>();
            Errors = new List<Error>();
        }
    }
}
