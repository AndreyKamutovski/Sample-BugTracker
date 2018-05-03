using System;
using System.Collections.Generic;
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
            AppRole role = new AppRole(roleName);
            return AddRole(role);
        }

        public IdentityResult Add(AppRole role)
        {
            return AddRole(role);
        }

        public IdentityResult AddRange(IEnumerable<AppRole> roles)
        {
            IdentityResult result = new IdentityResult();
            foreach (var role in roles)
            {
                result = AddRole(role);
            }
            return result;
        }

        public IEnumerable<AppRole> GetAll()
        {
            return _roleManager.Roles;
        }

        public AppRole GetByName(string roleName)
        {
            return _roleManager.FindByName(roleName);
        }

        private IdentityResult AddRole(AppRole role)
        {
            if (!_roleManager.RoleExists(role.Name))
            {
                return _roleManager.Create(role);
            }
            return new IdentityResult(string.Format("Role with name {0} already exists", role.Name));
        }
    }
}
