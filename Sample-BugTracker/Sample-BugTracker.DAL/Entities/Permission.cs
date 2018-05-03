using Sample_BugTracker.DAL.Enumerations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sample_BugTracker.DAL.Entities
{
    public class Permission
    {
        public int Id { get; set; }

        public PermissionList Description { get; set; }

        public virtual ICollection<AppRole> Roles { get; set; }

        public Permission()
        {
            Roles = new List<AppRole>();
        }
    }
}
