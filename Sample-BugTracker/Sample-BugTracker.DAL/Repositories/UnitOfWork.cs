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
        }

        public IUserRepository Users
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

        public int Complete()
        {
            return _context.SaveChanges();
        }

        public void Dispose()
        {
            _context.Dispose();
        }

        public ApplicationDbContext Context
        {
            get { return _context; }
        }
    }
}
