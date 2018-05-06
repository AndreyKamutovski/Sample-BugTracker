using Sample_BugTracker.DAL.Entities;
using Sample_BugTracker.DAL.Enumerations;
using Sample_BugTracker.DAL.Repositories;
using System.Collections.Generic;
using System.Data.Entity;

namespace Sample_BugTracker.DAL.EF
{
    // Инициализация происходит при первом обращении к контексту данных
    class BugTrackerDbInitializer : CreateDatabaseIfNotExists<ApplicationDbContext>
    {
        protected override void Seed(ApplicationDbContext _context)
        {
            var UoW = new UnitOfWork(_context);


            // Addition permission
            var EDITING_ASSIGNEE = new Permission() { Description = PermissionList.EDITING_ASSIGNEE_OF_ERROR };
            var EDITING_STATUS = new Permission() { Description = PermissionList.EDITING_STATUS_OF_ERROR };
            var EDITING_CLASSIFICATION = new Permission() { Description = PermissionList.EDITING_CLASSIFICATION_OF_ERROR };
            var EDITING_PRIORITY = new Permission() { Description = PermissionList.EDITING_PRIORITY_OF_ERROR };
            var EDITING_DEADLINE = new Permission() { Description = PermissionList.EDITING_DEADLINE_OF_ERROR };
            var VIEW_ALL_USER = new Permission() { Description = PermissionList.VIEW_ALL_USER_OF_PROJECT };
            var EDITING_ALL_USER = new Permission() { Description = PermissionList.EDITING_ALL_USER_OF_PROJECT };
            var ADDITION_ERROR = new Permission() { Description = PermissionList.ADDITION_ERROR };
            var EDITING_ERROR = new Permission() { Description = PermissionList.EDITING_ERROR };
            var EDITING_TITLE_DESCRIPTION = new Permission() { Description = PermissionList.EDITING_TITLE_DESCRIPTION_OF_ERROR };


            UoW.Permission.AddRange(new List<Permission>
                {
                    EDITING_ASSIGNEE,
                    EDITING_STATUS,
                    EDITING_CLASSIFICATION,
                    EDITING_PRIORITY,
                    EDITING_DEADLINE,
                    VIEW_ALL_USER,
                    EDITING_ALL_USER,
                    ADDITION_ERROR,
                    EDITING_ERROR,
                    EDITING_TITLE_DESCRIPTION
                });




            // Addition permission to role
            var adminRole = new AppRole("Admin");
            var moderatorRole = new AppRole("Moderator");
            var workerRole = new AppRole("Worker");
            var userRole = new AppRole("User");
            adminRole.Permission.AddRange(new List<Permission>()
                {
                    EDITING_ASSIGNEE,
                    EDITING_STATUS,
                    EDITING_CLASSIFICATION,
                    EDITING_PRIORITY,
                    EDITING_DEADLINE,
                    VIEW_ALL_USER,
                    EDITING_ALL_USER,
                    ADDITION_ERROR,
                    EDITING_ERROR,
                    EDITING_TITLE_DESCRIPTION
                });

            moderatorRole.Permission.AddRange(new List<Permission> {
                   EDITING_ASSIGNEE,
                   EDITING_DEADLINE,
                   EDITING_STATUS,
                   EDITING_PRIORITY,
                   EDITING_CLASSIFICATION,
                   VIEW_ALL_USER,

                   EDITING_TITLE_DESCRIPTION
            });

            workerRole.Permission.AddRange(new List<Permission>
            {
                EDITING_STATUS,
                ADDITION_ERROR,
                EDITING_ERROR,
                EDITING_TITLE_DESCRIPTION
            });

            userRole.Permission.AddRange(new List<Permission>
            {
                EDITING_PRIORITY,
                EDITING_CLASSIFICATION,
                ADDITION_ERROR,
                EDITING_ERROR,
                EDITING_TITLE_DESCRIPTION
            });

            UoW.Roles.AddRange(new List<AppRole>() {
                    adminRole,
                    moderatorRole,
                    workerRole,
                    userRole
                });

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
}
