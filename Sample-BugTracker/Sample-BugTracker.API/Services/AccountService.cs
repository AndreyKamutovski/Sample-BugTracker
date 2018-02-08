using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Sample_BugTracker.API.DTO;
using Sample_BugTracker.API.Exceptions;
using Sample_BugTracker.DAL.Repositories;
using System.ComponentModel.DataAnnotations;
using System.Net;
using System.Threading.Tasks;
using System.Web.Http;

namespace Sample_BugTracker.API.Services
{
    public class AccountService : BaseService
    {
        public async Task Register([Required]UserDTO user)
        {
            using (UnitOfWork)
            {
                IdentityUser appUser = new IdentityUser()
                {
                    UserName = user.Email,
                    Email = user.Email
                };

                IdentityUser userExists = await UnitOfWork.Users.Get(appUser.UserName, user.Password);
                if(userExists != null)
                {
                    throw new IdentityOperationException(string.Format("User with email {0} already exists", appUser.Email), HttpStatusCode.BadRequest);
                }

                IdentityResult addUserResult = await UnitOfWork.Users.Add(appUser, user.Password, user.RoleName);
                if (!addUserResult.Succeeded)
                {
                    throw new IdentityOperationException (addUserResult.Errors, HttpStatusCode.InternalServerError);
                }
            }
        }
    }
}