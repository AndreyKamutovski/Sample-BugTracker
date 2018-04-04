namespace Sample_BugTracker.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddforeignkeytoUserProjectModel : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.UserProjects", "RoleId", c => c.String(maxLength: 128));
            AddColumn("dbo.AspNetRoles", "Discriminator", c => c.String(nullable: false, maxLength: 128));
            CreateIndex("dbo.UserProjects", "RoleId");
            AddForeignKey("dbo.UserProjects", "RoleId", "dbo.AspNetRoles", "Id");
            DropColumn("dbo.UserProjects", "Role");
        }
        
        public override void Down()
        {
            AddColumn("dbo.UserProjects", "Role", c => c.String());
            DropForeignKey("dbo.UserProjects", "RoleId", "dbo.AspNetRoles");
            DropIndex("dbo.UserProjects", new[] { "RoleId" });
            DropColumn("dbo.AspNetRoles", "Discriminator");
            DropColumn("dbo.UserProjects", "RoleId");
        }
    }
}
