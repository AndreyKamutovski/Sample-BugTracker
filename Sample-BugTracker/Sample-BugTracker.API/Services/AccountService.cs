using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Sample_BugTracker.API.DTO;
using Sample_BugTracker.API.Exceptions;
using Sample_BugTracker.DAL.Entities;
using Sample_BugTracker.DAL.Repositories;
using System.ComponentModel.DataAnnotations;
using System.Net;
using System.Threading.Tasks;

namespace Sample_BugTracker.API.Services
{
    public class AccountService : BaseService
    {
        public async Task Register(UserDTO user)
        {
            using (var uow = CreateUnitOfWork())
            {
                AppUser appUser = new AppUser()
                {
                    UserName = user.Email,
                    Email = user.Email
                };

                AppUser userExists = await uow.Users.Get(appUser.UserName, user.Password);
                if(userExists != null)
                {
                    throw new IdentityOperationException(string.Format("User with email {0} already exists", appUser.Email), HttpStatusCode.Conflict);
                }

                IdentityResult addUserResult = await uow.Users.Add(appUser, user.Password, user.RoleName);
                if (!addUserResult.Succeeded)
                {
                    throw new IdentityOperationException (addUserResult.Errors, HttpStatusCode.InternalServerError);
                }
            }
        }
    }
}