using Sample_BugTracker.DAL.EF;
using Sample_BugTracker.DAL.Entities;
using Sample_BugTracker.DAL.Interfaces;

namespace Sample_BugTracker.DAL.Repositories
{
    public class ErrorRepository : Repository<Error>, IErrorRepository
    {
        public ErrorRepository(ApplicationDbContext context)
            : base(context)
        {
        }

        public ApplicationDbContext ApplicationContext
        {
            get
            {
                return base.Context as ApplicationDbContext;
            }
        }


    }
}
