namespace Sample_BugTracker.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AdditionAwaitingAttachmentUser : DbMigration
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
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.AwaitingAttachmentUsers", "RoleId", "dbo.AspNetRoles");
            DropForeignKey("dbo.AwaitingAttachmentUsers", "ProjectId", "dbo.Projects");
            DropIndex("dbo.AwaitingAttachmentUsers", new[] { "RoleId" });
            DropIndex("dbo.AwaitingAttachmentUsers", new[] { "ProjectId" });
            DropTable("dbo.AwaitingAttachmentUsers");
        }
    }
}
