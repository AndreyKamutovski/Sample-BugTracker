﻿using Microsoft.AspNet.Identity;
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
        IEnumerable<AppRole> GetAll();
        AppRole GetByName(string roleName);

        IdentityResult Add(string roleName);
        IdentityResult Add(AppRole role);

        IdentityResult AddRange(IEnumerable<AppRole> roles);

    }
}
