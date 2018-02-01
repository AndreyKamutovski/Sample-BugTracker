using Microsoft.AspNet.Identity;
using Sample_BugTracker.API.DTO;
using System.Threading.Tasks;
using System.Web.Http;

namespace Sample_BugTracker.API.Controllers
{
    public class AccountController : ApiController
    {
        private AccountController _accountService;
        // POST api/Account/Register
        [AllowAnonymous]
        public async Task<IHttpActionResult> Register(UserDTO user)
        {
            usin
            var result = await _accountService
        }
    }
}