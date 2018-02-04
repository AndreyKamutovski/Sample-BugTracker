using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Sample_BugTracker.DAL.EF;
using Sample_BugTracker.DAL.Interfaces;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;

namespace Sample_BugTracker.DAL.Repositories
{
    public class UserRepository: IUserRepository
    {
        private ApplicationDbContext _context;
        private UserManager<IdentityUser> _userManager;
        private RoleManager<IdentityRole> _roleManager;

        public UserRepository(ApplicationDbContext context)
        {
            _context = context;
            _userManager = new UserManager<IdentityUser>(new UserStore<IdentityUser>(_context))
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

            _roleManager = new RoleManager<IdentityRole>(new RoleStore<IdentityRole>(_context));
            _roleManager.Create(new IdentityRole("Admin"));
            _roleManager.Create(new IdentityRole("Moderator"));
            _roleManager.Create(new IdentityRole("Worker"));
            _roleManager.Create(new IdentityRole("User"));
        }

        public async Task<IdentityResult> Add(IdentityUser user, string password, string roleName)
        {
            IdentityResult resultCreation, resultAdditionToRole;
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

        public async Task<IdentityUser> Get(string username, string password)
        {
            IdentityUser user = await _userManager.FindAsync(username, password);
            return user;
        }

        public async Task<IEnumerable<IdentityUser>> GetAll()
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
