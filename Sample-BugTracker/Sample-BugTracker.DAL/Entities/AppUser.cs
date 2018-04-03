using Microsoft.AspNet.Identity.EntityFramework;
using System.Collections.Generic;

namespace Sample_BugTracker.DAL.Entities
{
    public class AppUser: IdentityUser
    {
        public virtual ICollection<UserProject> UserProjects { get; set; }
        public virtual ICollection<Error> Errors { get; set; }
        public virtual Portal Portal { get; set; }

        public string Avatar { get; set; }

        public AppUser(): base()
        {
            UserProjects = new List<UserProject>();
            Errors = new List<Error>();
        }
    }
}
