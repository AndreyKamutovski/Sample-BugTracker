
using Sample_BugTracker.API.DTO;
using Sample_BugTracker.API.Services;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;
using System.Web.Http;

namespace Sample_BugTracker.API.Controllers
{
    public class AccountController : ApiController
    {
        private AccountService _accountService = new AccountService();

        // POST api/Account/Register
        [AllowAnonymous]                    // [Authorize(Roles = "Admin")]
        public async Task<IHttpActionResult> Register([Required]UserDTO user)
        {
            await _accountService.Register(user);
            return Ok();
        }
    }
}