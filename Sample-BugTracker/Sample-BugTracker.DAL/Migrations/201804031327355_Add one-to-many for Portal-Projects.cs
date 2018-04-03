namespace Sample_BugTracker.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddonetomanyforPortalProjects : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Projects", "PortalId", c => c.String(maxLength: 128));
            CreateIndex("dbo.Projects", "PortalId");
            AddForeignKey("dbo.Projects", "PortalId", "dbo.Portals", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Projects", "PortalId", "dbo.Portals");
            DropIndex("dbo.Projects", new[] { "PortalId" });
            DropColumn("dbo.Projects", "PortalId");
        }
    }
}
