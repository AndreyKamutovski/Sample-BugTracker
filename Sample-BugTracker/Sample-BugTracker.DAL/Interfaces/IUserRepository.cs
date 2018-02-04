using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Sample_BugTracker.DAL.Interfaces
{
    public interface IUserRepository
    {
      
        Task<IdentityUser> Get(string username, string password);
        Task<IEnumerable<IdentityUser>> GetAll();

        Task<IdentityResult> Add(IdentityUser user, string password, string roleName);

        Task<IdentityResult> Remove(string username, string password);

        // по ходу ещё добавится поведение
    }
}
