using Microsoft.AspNet.Identity;
using Sample_BugTracker.API.DTO;
using Sample_BugTracker.DAL.EF;
using Sample_BugTracker.DAL.Repositories;
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
                    return new HttpResponseMessage(HttpStatusCode.BadRequest);
                }

                IdentityResult result = await _unitOfWork.Users.Add(user.UserName, user.Password);
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
                return new HttpResponseMessage(HttpStatusCode.InternalServerError);
            }
        }
    }
}