using Microsoft.AspNet.Identity.EntityFramework;
using System.Collections.Generic;

namespace Sample_BugTracker.DAL.Entities
{
    public class AppUser: IdentityUser
    {
        public ICollection<Project> Projects { get; set; }
        public ICollection<Error> Errors { get; set; }
        public Portal Portal { get; set; }

        public string Avatar { get; set; }
    }
}
