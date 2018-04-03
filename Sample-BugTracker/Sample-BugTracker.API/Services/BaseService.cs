using Sample_BugTracker.DAL.EF;
using Sample_BugTracker.DAL.Entities;
using Sample_BugTracker.DAL.Repositories;
using System.Security.Claims;

namespace Sample_BugTracker.API.Services
{
    public class BaseService
    {
        protected static AppUser CurrentUser;
        protected UnitOfWork Uow;

        protected UnitOfWork CreateUnitOfWork()
        {
            return new UnitOfWork(new ApplicationDbContext());
        }

        public BaseService()
        {
            Uow = CreateUnitOfWork();
            var identity = ClaimsPrincipal.Current.Identity as ClaimsIdentity ?? new ClaimsIdentity();
            CurrentUser = Uow.Users.GetByUserName(identity.Name);
            //uow.Context.Entry(CurrentUser).Reference("Portal").Load();
            //uow.Context.Entry(CurrentUser).Collection("Projects").Load();
            //uow.Context.Entry(CurrentUser).Collection("Errors").Load();
        }
    }
}