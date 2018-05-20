using Sample_BugTracker.DAL.EF;
using Sample_BugTracker.DAL.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sample_BugTracker.DAL.Entities;

namespace Sample_BugTracker.DAL.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ApplicationDbContext _context;

        public UnitOfWork(ApplicationDbContext context)
        {
            _context = context;
            Users = new UserRepository(_context);
            Errors = new ErrorRepository(_context);
            Projects = new ProjectRepository(_context);
            Portals = new PortalRepository(_context);
            UserProjects = new UserProjectRepository(_context);
            Roles = new RoleRepository(_context);
            AwaitingAttachmentUsers = new AwaitingAttachmentUserRepository(_context);
            Solutions = new ErrorSolutionRepository(_context);
            Permission = new PermissionRepository(_context);
            SolutionAttachments = new SolutionAttachmentRepository(_context);
            ErrorAttachments = new ErrorAttachmentRepository(_context);
        }

        public IPermissionRepository Permission
        {
            get;
            private set;
        }

        public IErrorSolutionRepository Solutions
        {
            get;
            private set;
        }

        public ISolutionAttachmentRepository SolutionAttachments
        {
            get;
            private set;
        }

        public IErrorAttachmentRepository ErrorAttachments
        {
            get;
            private set;
        }

        public IUserRepository Users
        {
            get;
            private set;
        }

        public IRoleRepository Roles
        {
            get;
            private set;
        }
        public IErrorRepository Errors
        {
            get;
            private set;
        }

        public IProjectRepository Projects
        {
            get;
            private set;
        }

        public IPortalRepository Portals
        {
            get;
            private set;
        }

        public IUserProjectRepository UserProjects
        {
            get;
            private set;
        }

        public IAwaitingAttachmentUser AwaitingAttachmentUsers
        {
            get;
            private set;
        }

        public int Complete()
        {
            return _context.SaveChanges();
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}
