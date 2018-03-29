namespace Sample_BugTracker.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddPortalsAndCreateAppUser : DbMigration
    {
        public override void Up()
        {
            RenameColumn(table: "dbo.Errors", name: "IdentityUserId", newName: "WorkerId");
            RenameIndex(table: "dbo.Errors", name: "IX_IdentityUserId", newName: "IX_WorkerId");
            CreateTable(
                "dbo.Portals",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Title = c.String(),
                        OwnerId = c.String(maxLength: 128),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.AspNetUsers", t => t.OwnerId)
                .Index(t => t.OwnerId);
            
            CreateTable(
                "dbo.AppUserProjects",
                c => new
                    {
                        AppUser_Id = c.String(nullable: false, maxLength: 128),
                        Project_Id = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.AppUser_Id, t.Project_Id })
                .ForeignKey("dbo.AspNetUsers", t => t.AppUser_Id, cascadeDelete: true)
                .ForeignKey("dbo.Projects", t => t.Project_Id, cascadeDelete: true)
                .Index(t => t.AppUser_Id)
                .Index(t => t.Project_Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Portals", "OwnerId", "dbo.AspNetUsers");
            DropForeignKey("dbo.AppUserProjects", "Project_Id", "dbo.Projects");
            DropForeignKey("dbo.AppUserProjects", "AppUser_Id", "dbo.AspNetUsers");
            DropIndex("dbo.AppUserProjects", new[] { "Project_Id" });
            DropIndex("dbo.AppUserProjects", new[] { "AppUser_Id" });
            DropIndex("dbo.Portals", new[] { "OwnerId" });
            DropTable("dbo.AppUserProjects");
            DropTable("dbo.Portals");
            RenameIndex(table: "dbo.Errors", name: "IX_WorkerId", newName: "IX_IdentityUserId");
            RenameColumn(table: "dbo.Errors", name: "WorkerId", newName: "IdentityUserId");
        }
    }
}
