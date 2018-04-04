using System;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Sample_BugTracker.DAL.EF;
using Sample_BugTracker.DAL.Entities;
using Sample_BugTracker.DAL.Interfaces;

namespace Sample_BugTracker.DAL.Repositories
{
    public class RoleRepository : IRoleRepository
    {
        private ApplicationDbContext _context;
        private RoleManager<AppRole> _roleManager;

        public RoleRepository(ApplicationDbContext context)
        {
            _context = context;
            _roleManager = new RoleManager<AppRole>(new RoleStore<AppRole>(_context));
        }

        public IdentityResult Add(string roleName)
        {
            if (!_roleManager.RoleExists(roleName))
            {
                AppRole role = new AppRole(roleName);
                return _roleManager.Create(role);
            }
            return new IdentityResult(string.Format("Role with name {0} already exists", roleName));
        }

        public AppRole GetByName(string roleName)
        {
            return _roleManager.FindByName(roleName);
        }


    }
}
