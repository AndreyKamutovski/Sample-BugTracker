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
    public class ApplicationContext: IdentityDbContext<IdentityUser>
    {
        public DbSet<Error> Errors { get; set; }
        public DbSet<Project> Progects { get; set; }


        public ApplicationContext(string connectionString)
            : base(connectionString)
        {
        }

        static ApplicationContext()
        {
            Database.SetInitializer<ApplicationContext>(new StoreDbInitializer());
        }

        public class StoreDbInitializer : DropCreateDatabaseAlways<ApplicationContext>
        {
            protected override void Seed(ApplicationContext db)
            {
                db.Users.Add(new IdentityUser("Bob"));
                db.Users.Add(new IdentityUser("Scott"));
                db.SaveChanges();
            }
        }
    }
}
