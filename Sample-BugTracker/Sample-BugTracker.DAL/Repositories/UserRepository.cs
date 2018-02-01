using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Sample_BugTracker.DAL.EF;
using Sample_BugTracker.DAL.Interfaces;
using System.Collections.Generic;
using System.Data.Entity;
using System.Threading.Tasks;

namespace Sample_BugTracker.DAL.Repositories
{
    public class UserRepository: IUserRepository
    {
        private ApplicationDbContext _context;
        private UserManager<IdentityUser> _userManager;
        public UserRepository(ApplicationDbContext context)
        {
            _context = context;
            _userManager = new UserManager<IdentityUser>(new UserStore<IdentityUser>(_context));
        }

        public async Task<IdentityResult> Add(string username, string password)
        {
            IdentityUser user = new IdentityUser
            {
                UserName = username
            };
            var result = await _userManager.CreateAsync(user, password);
            return result;
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
