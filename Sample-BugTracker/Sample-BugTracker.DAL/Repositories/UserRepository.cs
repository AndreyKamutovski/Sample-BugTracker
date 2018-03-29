using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Sample_BugTracker.DAL.EF;
using Sample_BugTracker.DAL.Entities;
using Sample_BugTracker.DAL.Interfaces;
using System.Collections.Generic;
using System.Data.Entity;
using System.Threading.Tasks;

namespace Sample_BugTracker.DAL.Repositories
{
    public class UserRepository: IUserRepository
    {
        private ApplicationDbContext _context;
        private UserManager<AppUser> _userManager;
        private RoleManager<IdentityRole> _roleManager;

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

        public async Task<IdentityResult> Add(AppUser user, string password, string roleName)
        {
            IdentityResult resultCreation;
            IdentityResult resultAdditionToRole;
            resultCreation = await _userManager.CreateAsync(user, password);
            if(resultCreation.Succeeded)
            {
                resultAdditionToRole = await _userManager.AddToRoleAsync(user.Id, roleName);
            }
            else
            {
                return resultCreation;
            }
            return resultAdditionToRole;
        }

        public async Task<AppUser> Get(string username, string password)
        {
            AppUser user = await _userManager.FindAsync(username, password);
            return user;
        }

        public async Task<IEnumerable<AppUser>> GetAll()
        {
            var users = await _userManager.Users.ToListAsync();
            return users;
        }

        public async Task<IdentityResult> Remove(string username, string password)
        {
            var result = await _userManager.DeleteAsync(await _userManager.FindAsync(username, password));
            return result;
        }
    }
}
