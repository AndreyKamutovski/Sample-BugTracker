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
    public class EFUnitOfWork : IUnitOfWork
    {
        private ApplicationContext db;
        private IAuthRepository _authRepository;
        public EFUnitOfWork(string connectionString)
        {
            db = new ApplicationContext(connectionString);
        }
        public IAuthRepository AuthRepository
        {
            get
            {
                return _authRepository ?? new AuthRepository(db);
            }
        }

        public IGenericRepository<Error> Errors
        {
            get
            {
                throw new NotImplementedException();
            }
        }

        public IGenericRepository<Project> Projects
        {
            get
            {
                throw new NotImplementedException();
            }
        }

        private bool disposed = false;

        public virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    db.Dispose();
                }
                this.disposed = true;
            }
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        public void Save()
        {
            db.SaveChanges();
        }
    }
}
