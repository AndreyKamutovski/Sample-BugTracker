using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Sample_BugTracker.DAL.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Sample_BugTracker.DAL.Interfaces
{
    public interface IUserRepository
    {
        // Async
        Task<IEnumerable<AppUser>> GetAllAsync();

        Task<AppUser> GetByUserNameAsync(string userName);

        Task<IdentityResult> RemoveAsync(string username, string password);


        // Sync
        AppUser GetByEmail(string email);

        IdentityResult Add(AppUser user, string password, string roleName);

    }
}
