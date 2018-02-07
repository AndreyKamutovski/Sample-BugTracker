using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Sample_BugTracker.API.DTO;
using Sample_BugTracker.BLL.Exceptions;
using Sample_BugTracker.DAL.EF;
using Sample_BugTracker.DAL.Repositories;
using System.ComponentModel.DataAnnotations;
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

        public async Task<HttpResponseMessage> Register([Required]UserDTO user)
        {
            using (_unitOfWork)
            {
                IdentityUser appUser = new IdentityUser()
                {
                    UserName = user.Email,
                    Email = user.Email
                };

                IdentityResult result = await _unitOfWork.Users.Add(appUser, user.Password, user.RoleName);
                 if(!result.Succeeded) {
                    throw new UserNotRegisteredException(result.Errors);
                };
                return new HttpResponseMessage(HttpStatusCode.OK);
            }
        }
    }
}