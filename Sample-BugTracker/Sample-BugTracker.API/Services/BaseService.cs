using Sample_BugTracker.DAL.EF;
using Sample_BugTracker.DAL.Entities;
using Sample_BugTracker.DAL.Repositories;
using System.Security.Claims;

namespace Sample_BugTracker.API.Services
{
    public class BaseService
    {
        protected AppUser CurrentUser;
        protected UnitOfWork UoW;

        protected UnitOfWork CreateUnitOfWork()
        {
            return new UnitOfWork(new ApplicationDbContext());
        }

        public BaseService()
        {
            UoW = CreateUnitOfWork();
            var identity = ClaimsPrincipal.Current.Identity as ClaimsIdentity ?? new ClaimsIdentity();
            CurrentUser = UoW.Users.GetByUserName(identity.Name);
        }
    }
}