using Sample_BugTracker.DAL.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Sample_BugTracker.BLL.Services
{
    public class AccountService: IAccountSservice
    {
        UnitOfWork Database { get; set; }

        public AccountService()
        {
            Database = new UnitOfWork("BTContext");
        }


    }
}