using Sample_BugTracker.API.Services;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;

namespace Sample_BugTracker.API.Controllers
{
    public class AccountController : ApiController
    {
        private AccountService _accountService = new AccountService();
        
        [HttpGet]
        [AllowAnonymous]
        public bool CheckEmailNotTaken([Required]string email)
        {
            return _accountService.CheckEmailNotTaken(email);
        }


    }
}
