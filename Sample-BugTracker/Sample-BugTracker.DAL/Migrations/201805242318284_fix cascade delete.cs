namespace Sample_BugTracker.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class fixcascadedelete : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Errors", "ProjectId", "dbo.Projects");
            DropIndex("dbo.Errors", new[] { "ProjectId" });
            AlterColumn("dbo.Errors", "ProjectId", c => c.Int(nullable: false));
            CreateIndex("dbo.Errors", "ProjectId");
            AddForeignKey("dbo.Errors", "ProjectId", "dbo.Projects", "Id", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Errors", "ProjectId", "dbo.Projects");
            DropIndex("dbo.Errors", new[] { "ProjectId" });
            AlterColumn("dbo.Errors", "ProjectId", c => c.Int());
            CreateIndex("dbo.Errors", "ProjectId");
            AddForeignKey("dbo.Errors", "ProjectId", "dbo.Projects", "Id");
        }
    }
}
