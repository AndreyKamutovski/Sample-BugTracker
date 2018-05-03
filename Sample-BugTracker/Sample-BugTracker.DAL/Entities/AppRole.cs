using Microsoft.AspNet.Identity.EntityFramework;
using System.Collections.Generic;

namespace Sample_BugTracker.DAL.Entities
{
    public class AppRole : IdentityRole
    {
        public AppRole() : base() {

        }

        public AppRole(string name)
            : base(name)
        {
            Permission = new List<Permission>();
        }

        public virtual List<Permission> Permission { get; set; }

    }
}
