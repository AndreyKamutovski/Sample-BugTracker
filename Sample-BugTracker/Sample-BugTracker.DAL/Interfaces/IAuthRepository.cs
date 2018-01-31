using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Sample_BugTracker.DAL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sample_BugTracker.DAL.Interfaces
{
    public interface IAuthRepository: IDisposable
    {
        Task<IdentityResult> RegisterUser(User user);
        Task<IdentityUser> FindUser(string userName, string password);
    }
}
