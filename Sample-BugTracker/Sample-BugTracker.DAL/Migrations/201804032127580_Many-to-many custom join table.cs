namespace Sample_BugTracker.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Manytomanycustomjointable : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.AppUserProjects", "AppUser_Id", "dbo.AspNetUsers");
            DropForeignKey("dbo.AppUserProjects", "Project_Id", "dbo.Projects");
            DropIndex("dbo.AppUserProjects", new[] { "AppUser_Id" });
            DropIndex("dbo.AppUserProjects", new[] { "Project_Id" });
            CreateTable(
                "dbo.UserProjects",
                c => new
                    {
                        ProjectId = c.Int(nullable: false),
                        WorkerId = c.String(nullable: false, maxLength: 128),
                        Role = c.String(),
                    })
                .PrimaryKey(t => new { t.ProjectId, t.WorkerId })
                .ForeignKey("dbo.Projects", t => t.ProjectId, cascadeDelete: true)
                .ForeignKey("dbo.AspNetUsers", t => t.WorkerId, cascadeDelete: true)
                .Index(t => t.ProjectId)
                .Index(t => t.WorkerId);
            
            DropTable("dbo.AppUserProjects");
        }
        
        public override void Down()
        {
            CreateTable(
                "dbo.AppUserProjects",
                c => new
                    {
                        AppUser_Id = c.String(nullable: false, maxLength: 128),
                        Project_Id = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.AppUser_Id, t.Project_Id });
            
            DropForeignKey("dbo.UserProjects", "WorkerId", "dbo.AspNetUsers");
            DropForeignKey("dbo.UserProjects", "ProjectId", "dbo.Projects");
            DropIndex("dbo.UserProjects", new[] { "WorkerId" });
            DropIndex("dbo.UserProjects", new[] { "ProjectId" });
            DropTable("dbo.UserProjects");
            CreateIndex("dbo.AppUserProjects", "Project_Id");
            CreateIndex("dbo.AppUserProjects", "AppUser_Id");
            AddForeignKey("dbo.AppUserProjects", "Project_Id", "dbo.Projects", "Id", cascadeDelete: true);
            AddForeignKey("dbo.AppUserProjects", "AppUser_Id", "dbo.AspNetUsers", "Id", cascadeDelete: true);
        }
    }
}
