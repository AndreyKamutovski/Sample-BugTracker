using Sample_BugTracker.DAL.EF;
using Sample_BugTracker.DAL.Repositories;

namespace Sample_BugTracker.API.Services
{
    public class BaseService
    {
        protected UnitOfWork UnitOfWork
        {
            get
            {
                return new UnitOfWork(new ApplicationDbContext());
            }
        }
    }
}