using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Sample_BugTracker.DAL.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Sample_BugTracker.DAL.Interfaces
{
    public interface IUserRepository
    {
      
        Task<AppUser> Get(string username, string password);
        Task<IEnumerable<AppUser>> GetAll();

        Task<IdentityResult> Add(AppUser user, string password, string roleName);

        Task<IdentityResult> Remove(string username, string password);

        // по ходу ещё добавится поведение
    }
}
