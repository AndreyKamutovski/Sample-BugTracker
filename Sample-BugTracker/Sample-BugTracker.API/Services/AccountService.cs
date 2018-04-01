using Sample_BugTracker.DAL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Sample_BugTracker.API.Services
{
    public class AccountService : BaseService
    {
        public bool CheckEmailNotTaken(string email)
        {
            using (var uow = CreateUnitOfWork())
            {
                AppUser user = uow.Users.GetByEmail(email);
                return user == null ? true : false;
            }
        }
    }
}