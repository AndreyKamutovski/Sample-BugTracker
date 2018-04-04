using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Sample_BugTracker.DAL.EF;
using Sample_BugTracker.DAL.Entities;
using Sample_BugTracker.DAL.Interfaces;
using System.Collections.Generic;
using System.Data.Entity;
using System.Threading.Tasks;
using System;

namespace Sample_BugTracker.DAL.Repositories
{
    public class UserRepository : IUserRepository
    {
        private ApplicationDbContext _context;
        private UserManager<AppUser> _userManager;

        public UserRepository(ApplicationDbContext context)
        {
            _context = context;
            _userManager = new UserManager<AppUser>(new UserStore<AppUser>(_context))
            {
                PasswordValidator = new PasswordValidator()
                {
                    RequiredLength = 6,
                    RequireNonLetterOrDigit = true,
                    RequireDigit = true,
                    RequireLowercase = true,
                    RequireUppercase = true
                }
            };
        }

        // Async
        public async Task<IEnumerable<AppUser>> GetAllAsync()
        {
            var users = await _userManager.Users.ToListAsync();
            return users;
        }

        public async Task<IdentityResult> RemoveAsync(string username, string password)
        {
            var result = await _userManager.DeleteAsync(await _userManager.FindAsync(username, password));
            return result;
        }

        public async Task<AppUser> GetByUserNameAsync(string userName)
        {
            AppUser user = await _userManager.FindByNameAsync(userName);
            return user;
        }

        public async Task<AppUser> GetByUserNameAndPasswordAsync(string userName, string password)
        {
            AppUser user = await _userManager.FindAsync(userName, password);
            return user;
        }

        // Sync
        public AppUser GetByEmail(string email)
        {
            AppUser user = _userManager.FindByEmail(email);
            return user;
        }

        public IdentityResult Add(AppUser user, string password, string roleName)
        {
            IdentityResult resultCreation;
            IdentityResult resultAdditionToRole;
            resultCreation = _userManager.Create(user, password);
            if (resultCreation.Succeeded)
            {
                resultAdditionToRole = _userManager.AddToRole(user.Id, roleName);
            }
            else
            {
                return resultCreation;
            }
            return resultAdditionToRole;
        }

        public AppUser GetByUserName(string userName)
        {
            AppUser user = _userManager.FindByName(userName);
            return user;
        }
    }
}
