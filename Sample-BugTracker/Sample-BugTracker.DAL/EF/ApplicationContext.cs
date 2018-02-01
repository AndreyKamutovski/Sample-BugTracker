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


        public ApplicationDbContext(string connectionString)
            : base(connectionString)
        {
        }

        static ApplicationDbContext()
        {
            Database.SetInitializer(new StoreDbInitializer());
        }

        public class StoreDbInitializer : DropCreateDatabaseAlways<ApplicationDbContext>
        {
            protected override void Seed(ApplicationDbContext db)
            {
                db.Users.Add(new IdentityUser("Bob"));
                db.Users.Add(new IdentityUser("Scott"));
                db.SaveChanges();
            }
        }
    }
}
