using Sample_BugTracker.API.Intarfaces;
using Sample_BugTracker.DAL.EF;
using Sample_BugTracker.DAL.Repositories;
using System;
using Sample_BugTracker.API.DTO;
using System.Threading.Tasks;
using System.Web.Http;

namespace Sample_BugTracker.API.Services
{
    public class AccountService: IDisposable
    {
        private UnitOfWork _unitOfWork { get; set; }

        public AccountService()
        {
            _unitOfWork = new UnitOfWork(new ApplicationDbContext());
        }

        public Task<IHttpActionResult> Register(UserDTO user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            IdentityResult result = await Database.AuthRepository.RegisterUser(userModel);

            IHttpActionResult errorResult = GetErrorResult(result);

            if (errorResult != null)
            {
                return errorResult;
            }

            return Ok();
        }

        private IHttpActionResult GetErrorResult(IdentityResult result)
        {
            if (result == null)
            {
                return InternalServerError();
            }

            if (!result.Succeeded)
            {
                if (result.Errors != null)
                {
                    foreach (string error in result.Errors)
                    {
                        ModelState.AddModelError("", error);
                    }
                }

                if (ModelState.IsValid)
                {
                    // No ModelState errors are available to send, so just return an empty BadRequest.
                    return BadRequest();
                }

                return BadRequest(ModelState);
            }

            return null;
        }

        public void Dispose()
        {
            _unitOfWork.Dispose();
        }
    }
}