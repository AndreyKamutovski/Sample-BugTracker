using Sample_BugTracker.DAL.EF;
using Sample_BugTracker.DAL.Entities;
using Sample_BugTracker.DAL.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sample_BugTracker.DAL.Repositories
{
    public class ErrorRepository : IGenericRepository<Error>
    {
        private ApplicationContext db;

        public ErrorRepository(ApplicationContext context)
        {
            db = context;
        }
        public void Create(Error item)
        {
            throw new NotImplementedException();
        }

        public void Delete(int id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Error> Find(Func<Error, bool> predicate)
        {
            throw new NotImplementedException();
        }

        public Error Get(int id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Error> GetAll()
        {
            return db.Errors;
        }

        public void Update(Error item)
        {
            throw new NotImplementedException();
        }
    }
}
