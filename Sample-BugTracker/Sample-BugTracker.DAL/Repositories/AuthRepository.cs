using Sample_BugTracker.DAL.EF;
using Sample_BugTracker.DAL.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Sample_BugTracker.DAL.Entities;

namespace Sample_BugTracker.DAL.Repositories
{
    public class AuthRepository: IAuthRepository
    {
        private ApplicationContext db;
        private UserManager<IdentityUser> _userManager;
        public AuthRepository(ApplicationContext context)
        {
            db = context;
            _userManager = new UserManager<IdentityUser>(new UserStore<IdentityUser>(db));
        }

        public void Dispose()
        {
            db.Dispose();
            _userManager.Dispose();
        }

        public async Task<IdentityUser> FindUser(string userName, string password)
        {
            IdentityUser user = await _userManager.FindAsync(userName, password);
            return user;
        }

        public async Task<IdentityResult> RegisterUser(User userModel)
        {
            IdentityUser user = new IdentityUser
            {
                UserName = userModel.UserName
            };
            var result = await _userManager.CreateAsync(user, userModel.Password);
            return result;
        }
    }
}
