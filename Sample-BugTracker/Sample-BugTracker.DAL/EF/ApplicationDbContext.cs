using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Sample_BugTracker.DAL.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sample_BugTracker.DAL.EF
{
    public class ApplicationDbContext: IdentityDbContext<IdentityUser>
    {
        public DbSet<Error> Errors { get; set; }
        public DbSet<Project> Projects { get; set; }


        public ApplicationDbContext()
            : base("BTContext")
        {
        }

        static ApplicationDbContext()
        {
            Database.SetInitializer(new StoreDbInitializer());
        }

        // Инициализация происходит при первом обращении к контексту данных
        public class StoreDbInitializer : DropCreateDatabaseAlways<ApplicationDbContext>
        {
            protected override void Seed(ApplicationDbContext _context)
            {
                var _roleManager = new RoleManager<IdentityRole>(new RoleStore<IdentityRole>(_context));
                _roleManager.Create(new IdentityRole("Admin"));
                _roleManager.Create(new IdentityRole("Moderator"));
                _roleManager.Create(new IdentityRole("Worker"));
                _roleManager.Create(new IdentityRole("User"));

                // Addition Admin
                var _userManager = new UserManager<IdentityUser>(new UserStore<IdentityUser>(_context));
                string adminPassword = "aBcDe20*";
                IdentityUser admin = new IdentityUser()
                {
                    Email = "KVISLAND20@gmail.com",
                    UserName = "SuperUser"
                };
                _userManager.Create(admin, adminPassword);
                _userManager.AddToRole(admin.Id, "Admin");
                _context.SaveChanges();
            }
        }
    }
}
