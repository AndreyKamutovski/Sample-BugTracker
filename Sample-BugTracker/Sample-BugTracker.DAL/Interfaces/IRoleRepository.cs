using Microsoft.AspNet.Identity;
using Sample_BugTracker.DAL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sample_BugTracker.DAL.Interfaces
{
    public interface IRoleRepository
    {
        AppRole GetByName(string roleName);

        IdentityResult Add(string roleName);
    }
}
