using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Sample_BugTracker.DAL.Entities;
using Sample_BugTracker.DAL.Repositories;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sample_BugTracker.DAL.EF
{
    public class ApplicationDbContext : IdentityDbContext<AppUser>
    {
        public DbSet<Error> Errors { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<Portal> Portals { get; set; }
        public DbSet<UserProject> UserProjects { get; set; }

        public ApplicationDbContext()
            : base("BTContext")
        {
        }

        static ApplicationDbContext()
        {
            Database.SetInitializer(new StoreDbInitializer());
        }

        // Инициализация происходит при первом обращении к контексту данных
        public class StoreDbInitializer : CreateDatabaseIfNotExists<ApplicationDbContext>
        {
            protected override void Seed(ApplicationDbContext _context)
            {
                var UoW = new UnitOfWork(_context);
                UoW.Roles.Add("Admin");
                UoW.Roles.Add("Moderator");
                UoW.Roles.Add("Worker");
                UoW.Roles.Add("User");

                // Addition Admin
                AppUser admin = new AppUser()
                {
                    Email = "KVISLAND20@gmail.com",
                    UserName = "KVISLAND20@gmail.com"
                };
                UoW.Users.Add(admin, "aBcDe20*", "Admin");
                Portal portal = new Portal() { Id = admin.Id, Title = "Admin's portal" };
                UoW.Portals.Add(portal);
                UoW.Complete();
            }
        }

        // Fluent API
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}
