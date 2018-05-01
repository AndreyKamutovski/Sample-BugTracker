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

        Task<IdentityResult> RemoveAsync(string username, string password);

        Task<AppUser> GetByUserNameAsync(string userName);

        Task<AppUser> GetByUserNameAndPasswordAsync(string userName, string password);



        // Sync
        IEnumerable<AppUser> GetAll();
        AppUser GetByEmail(string email);

        AppUser GetByUserName(string userName);

        IdentityResult Add(AppUser user, string password, string roleName);

        bool IsEmailAvailable(string email);
    }
}
