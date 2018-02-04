using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Sample_BugTracker.API.DTO;
using Sample_BugTracker.DAL.EF;
using Sample_BugTracker.DAL.Repositories;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;

namespace Sample_BugTracker.API.Services
{
    public class AccountService
    {
        private readonly UnitOfWork _unitOfWork;

        public AccountService()
        {
            _unitOfWork = new UnitOfWork(new ApplicationDbContext());
        }

        public async Task<HttpResponseMessage> Register(UserDTO user)
        {
            using (_unitOfWork)
            {
                if (!user.Validate())
                {
                    return GetHttpResponseMessage(HttpStatusCode.BadRequest, user.ValidationResults);
                }

                IdentityUser appUser = new IdentityUser()
                {
                    UserName = user.Email,
                    Email = user.Email
                };
                IdentityResult result = await _unitOfWork.Users.Add(appUser, user.Password, user.RoleName);
                HttpResponseMessage httpResult = GetHttpResponseMessageForIdentityResult(result);
                return httpResult;
            }
        }

        private HttpResponseMessage GetHttpResponseMessageForIdentityResult(IdentityResult result)
        {
            if (result.Succeeded)
            {
                return new HttpResponseMessage(HttpStatusCode.OK);
            }
            else
            {
                return GetHttpResponseMessage(HttpStatusCode.InternalServerError, result.Errors);
            }
        }

        private HttpResponseMessage GetHttpResponseMessage(HttpStatusCode statusCode, IEnumerable<string> errorList)
        {
            var httpMsg = new HttpResponseMessage(statusCode)
            {
                Content = new StringContent(String.Join("\n", errorList))
            };
           return httpMsg;
        }
    }
}