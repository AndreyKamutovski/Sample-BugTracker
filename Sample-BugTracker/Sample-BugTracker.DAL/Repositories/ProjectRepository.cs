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
    public class ProjectRepository : IGenericRepository<Project>
    {
        private ApplicationContext db;

        public ProjectRepository(ApplicationContext context)
        {
            db = context;
        }
        public void Create(Project item)
        {
            throw new NotImplementedException();
        }

        public void Delete(int id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Project> Find(Func<Project, bool> predicate)
        {
            throw new NotImplementedException();
        }

        public Project Get(int id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Project> GetAll()
        {
            return db.Progects;
        }

        public void Update(Project item)
        {
            throw new NotImplementedException();
        }
    }
}
