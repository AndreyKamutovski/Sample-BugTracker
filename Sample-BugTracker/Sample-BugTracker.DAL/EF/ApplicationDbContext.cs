﻿using Microsoft.AspNet.Identity.EntityFramework;
using Sample_BugTracker.DAL.Entities;
using System.Data.Entity;

namespace Sample_BugTracker.DAL.EF
{
    public class ApplicationDbContext : IdentityDbContext<AppUser>
    {
        public DbSet<Error> Errors { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<Portal> Portals { get; set; }
        public DbSet<UserProject> UserProjects { get; set; }
        public DbSet<AwaitingAttachmentUser> AwaitingAttachmentUsers { get; set; }
        public DbSet<ErrorSolution> ErrorSolutions { get; set; }
        public DbSet<ErrorAttachment> ErrorAttachments { get; set; }
        public DbSet<SolutionAttachment> SolutionAttachments { get; set; }
        public DbSet<Permission> Permissions { get; set; }


        public ApplicationDbContext()
            : base("BTContext")
        {
            //Database.SetInitializer(new MigrateDatabaseToLatestVersion<ApplicationDbContext, Configuration>());
        }

        static ApplicationDbContext()
        {
            Database.SetInitializer(new BugTrackerDbInitializer());
        }

        // Fluent API
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Error>()
                    .HasRequired(m => m.Author)
                    .WithMany(t => t.AuthorErrors)
                    .HasForeignKey(m => m.AuthorId)
                    .WillCascadeOnDelete(false);

            modelBuilder.Entity<Error>().HasOptional(m => m.Assignee)
                        .WithMany(t => t.AssigneeErrors)
                        .HasForeignKey(m => m.AssigneeId)
                        .WillCascadeOnDelete(false);
        }
    }
}
