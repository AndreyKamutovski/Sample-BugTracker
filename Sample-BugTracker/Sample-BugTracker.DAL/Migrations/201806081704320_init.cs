namespace Sample_BugTracker.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class init : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.AwaitingAttachmentUsers",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        Email = c.String(),
                        ProjectId = c.Int(nullable: false),
                        RoleId = c.String(maxLength: 128),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Projects", t => t.ProjectId, cascadeDelete: true)
                .ForeignKey("dbo.AspNetRoles", t => t.RoleId)
                .Index(t => t.ProjectId)
                .Index(t => t.RoleId);
            
            CreateTable(
                "dbo.Projects",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Title = c.String(),
                        DateStart = c.DateTime(nullable: false),
                        DateEnd = c.DateTime(nullable: false),
                        Description = c.String(),
                        PortalId = c.String(maxLength: 128),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Portals", t => t.PortalId)
                .Index(t => t.PortalId);
            
            CreateTable(
                "dbo.Errors",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Title = c.String(),
                        Description = c.String(),
                        DateCreation = c.DateTime(),
                        Deadline = c.DateTime(),
                        Status = c.Int(nullable: false),
                        Priority = c.Int(nullable: false),
                        Classification = c.Int(nullable: false),
                        ProjectId = c.Int(nullable: false),
                        AuthorId = c.String(nullable: false, maxLength: 128),
                        AssigneeId = c.String(maxLength: 128),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.AspNetUsers", t => t.AssigneeId)
                .ForeignKey("dbo.AspNetUsers", t => t.AuthorId)
                .ForeignKey("dbo.Projects", t => t.ProjectId, cascadeDelete: true)
                .Index(t => t.ProjectId)
                .Index(t => t.AuthorId)
                .Index(t => t.AssigneeId);
            
            CreateTable(
                "dbo.AspNetUsers",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        Avatar = c.String(),
                        Email = c.String(maxLength: 256),
                        EmailConfirmed = c.Boolean(nullable: false),
                        PasswordHash = c.String(),
                        SecurityStamp = c.String(),
                        PhoneNumber = c.String(),
                        PhoneNumberConfirmed = c.Boolean(nullable: false),
                        TwoFactorEnabled = c.Boolean(nullable: false),
                        LockoutEndDateUtc = c.DateTime(),
                        LockoutEnabled = c.Boolean(nullable: false),
                        AccessFailedCount = c.Int(nullable: false),
                        UserName = c.String(nullable: false, maxLength: 256),
                    })
                .PrimaryKey(t => t.Id)
                .Index(t => t.UserName, unique: true, name: "UserNameIndex");
            
            CreateTable(
                "dbo.ErrorAttachments",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        ErrorId = c.Int(nullable: false),
                        UploadDate = c.DateTime(),
                        FileName = c.String(),
                        OriginalFileName = c.String(),
                        AuthorId = c.String(maxLength: 128),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.AspNetUsers", t => t.AuthorId)
                .ForeignKey("dbo.Errors", t => t.ErrorId, cascadeDelete: true)
                .Index(t => t.ErrorId)
                .Index(t => t.AuthorId);
            
            CreateTable(
                "dbo.AspNetUserClaims",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        UserId = c.String(nullable: false, maxLength: 128),
                        ClaimType = c.String(),
                        ClaimValue = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.AspNetUsers", t => t.UserId, cascadeDelete: true)
                .Index(t => t.UserId);
            
            CreateTable(
                "dbo.ErrorSolutions",
                c => new
                    {
                        Id = c.Int(nullable: false),
                        Description = c.String(),
                        RecievingDate = c.DateTime(),
                        AuthorId = c.String(maxLength: 128),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.AspNetUsers", t => t.AuthorId)
                .ForeignKey("dbo.Errors", t => t.Id)
                .Index(t => t.Id)
                .Index(t => t.AuthorId);
            
            CreateTable(
                "dbo.SolutionAttachments",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        SolutionId = c.Int(nullable: false),
                        UploadDate = c.DateTime(),
                        FileName = c.String(),
                        OriginalFileName = c.String(),
                        AuthorId = c.String(maxLength: 128),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.AspNetUsers", t => t.AuthorId)
                .ForeignKey("dbo.ErrorSolutions", t => t.SolutionId, cascadeDelete: true)
                .Index(t => t.SolutionId)
                .Index(t => t.AuthorId);
            
            CreateTable(
                "dbo.AspNetUserLogins",
                c => new
                    {
                        LoginProvider = c.String(nullable: false, maxLength: 128),
                        ProviderKey = c.String(nullable: false, maxLength: 128),
                        UserId = c.String(nullable: false, maxLength: 128),
                    })
                .PrimaryKey(t => new { t.LoginProvider, t.ProviderKey, t.UserId })
                .ForeignKey("dbo.AspNetUsers", t => t.UserId, cascadeDelete: true)
                .Index(t => t.UserId);
            
            CreateTable(
                "dbo.Portals",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        Title = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.AspNetUsers", t => t.Id)
                .Index(t => t.Id);
            
            CreateTable(
                "dbo.AspNetUserRoles",
                c => new
                    {
                        UserId = c.String(nullable: false, maxLength: 128),
                        RoleId = c.String(nullable: false, maxLength: 128),
                    })
                .PrimaryKey(t => new { t.UserId, t.RoleId })
                .ForeignKey("dbo.AspNetUsers", t => t.UserId, cascadeDelete: true)
                .ForeignKey("dbo.AspNetRoles", t => t.RoleId, cascadeDelete: true)
                .Index(t => t.UserId)
                .Index(t => t.RoleId);
            
            CreateTable(
                "dbo.UserProjects",
                c => new
                    {
                        ProjectId = c.Int(nullable: false),
                        WorkerId = c.String(nullable: false, maxLength: 128),
                        RoleId = c.String(maxLength: 128),
                    })
                .PrimaryKey(t => new { t.ProjectId, t.WorkerId })
                .ForeignKey("dbo.Projects", t => t.ProjectId, cascadeDelete: true)
                .ForeignKey("dbo.AspNetRoles", t => t.RoleId)
                .ForeignKey("dbo.AspNetUsers", t => t.WorkerId, cascadeDelete: true)
                .Index(t => t.ProjectId)
                .Index(t => t.WorkerId)
                .Index(t => t.RoleId);
            
            CreateTable(
                "dbo.AspNetRoles",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        Name = c.String(nullable: false, maxLength: 256),
                        Discriminator = c.String(nullable: false, maxLength: 128),
                    })
                .PrimaryKey(t => t.Id)
                .Index(t => t.Name, unique: true, name: "RoleNameIndex");
            
            CreateTable(
                "dbo.Permissions",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Description = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.PermissionAppRoles",
                c => new
                    {
                        Permission_Id = c.Int(nullable: false),
                        AppRole_Id = c.String(nullable: false, maxLength: 128),
                    })
                .PrimaryKey(t => new { t.Permission_Id, t.AppRole_Id })
                .ForeignKey("dbo.Permissions", t => t.Permission_Id, cascadeDelete: true)
                .ForeignKey("dbo.AspNetRoles", t => t.AppRole_Id, cascadeDelete: true)
                .Index(t => t.Permission_Id)
                .Index(t => t.AppRole_Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.AspNetUserRoles", "RoleId", "dbo.AspNetRoles");
            DropForeignKey("dbo.AwaitingAttachmentUsers", "RoleId", "dbo.AspNetRoles");
            DropForeignKey("dbo.AwaitingAttachmentUsers", "ProjectId", "dbo.Projects");
            DropForeignKey("dbo.Errors", "ProjectId", "dbo.Projects");
            DropForeignKey("dbo.Errors", "AuthorId", "dbo.AspNetUsers");
            DropForeignKey("dbo.Errors", "AssigneeId", "dbo.AspNetUsers");
            DropForeignKey("dbo.UserProjects", "WorkerId", "dbo.AspNetUsers");
            DropForeignKey("dbo.UserProjects", "RoleId", "dbo.AspNetRoles");
            DropForeignKey("dbo.PermissionAppRoles", "AppRole_Id", "dbo.AspNetRoles");
            DropForeignKey("dbo.PermissionAppRoles", "Permission_Id", "dbo.Permissions");
            DropForeignKey("dbo.UserProjects", "ProjectId", "dbo.Projects");
            DropForeignKey("dbo.AspNetUserRoles", "UserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.Projects", "PortalId", "dbo.Portals");
            DropForeignKey("dbo.Portals", "Id", "dbo.AspNetUsers");
            DropForeignKey("dbo.AspNetUserLogins", "UserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.ErrorSolutions", "Id", "dbo.Errors");
            DropForeignKey("dbo.ErrorSolutions", "AuthorId", "dbo.AspNetUsers");
            DropForeignKey("dbo.SolutionAttachments", "SolutionId", "dbo.ErrorSolutions");
            DropForeignKey("dbo.SolutionAttachments", "AuthorId", "dbo.AspNetUsers");
            DropForeignKey("dbo.AspNetUserClaims", "UserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.ErrorAttachments", "ErrorId", "dbo.Errors");
            DropForeignKey("dbo.ErrorAttachments", "AuthorId", "dbo.AspNetUsers");
            DropIndex("dbo.PermissionAppRoles", new[] { "AppRole_Id" });
            DropIndex("dbo.PermissionAppRoles", new[] { "Permission_Id" });
            DropIndex("dbo.AspNetRoles", "RoleNameIndex");
            DropIndex("dbo.UserProjects", new[] { "RoleId" });
            DropIndex("dbo.UserProjects", new[] { "WorkerId" });
            DropIndex("dbo.UserProjects", new[] { "ProjectId" });
            DropIndex("dbo.AspNetUserRoles", new[] { "RoleId" });
            DropIndex("dbo.AspNetUserRoles", new[] { "UserId" });
            DropIndex("dbo.Portals", new[] { "Id" });
            DropIndex("dbo.AspNetUserLogins", new[] { "UserId" });
            DropIndex("dbo.SolutionAttachments", new[] { "AuthorId" });
            DropIndex("dbo.SolutionAttachments", new[] { "SolutionId" });
            DropIndex("dbo.ErrorSolutions", new[] { "AuthorId" });
            DropIndex("dbo.ErrorSolutions", new[] { "Id" });
            DropIndex("dbo.AspNetUserClaims", new[] { "UserId" });
            DropIndex("dbo.ErrorAttachments", new[] { "AuthorId" });
            DropIndex("dbo.ErrorAttachments", new[] { "ErrorId" });
            DropIndex("dbo.AspNetUsers", "UserNameIndex");
            DropIndex("dbo.Errors", new[] { "AssigneeId" });
            DropIndex("dbo.Errors", new[] { "AuthorId" });
            DropIndex("dbo.Errors", new[] { "ProjectId" });
            DropIndex("dbo.Projects", new[] { "PortalId" });
            DropIndex("dbo.AwaitingAttachmentUsers", new[] { "RoleId" });
            DropIndex("dbo.AwaitingAttachmentUsers", new[] { "ProjectId" });
            DropTable("dbo.PermissionAppRoles");
            DropTable("dbo.Permissions");
            DropTable("dbo.AspNetRoles");
            DropTable("dbo.UserProjects");
            DropTable("dbo.AspNetUserRoles");
            DropTable("dbo.Portals");
            DropTable("dbo.AspNetUserLogins");
            DropTable("dbo.SolutionAttachments");
            DropTable("dbo.ErrorSolutions");
            DropTable("dbo.AspNetUserClaims");
            DropTable("dbo.ErrorAttachments");
            DropTable("dbo.AspNetUsers");
            DropTable("dbo.Errors");
            DropTable("dbo.Projects");
            DropTable("dbo.AwaitingAttachmentUsers");
        }
    }
}
