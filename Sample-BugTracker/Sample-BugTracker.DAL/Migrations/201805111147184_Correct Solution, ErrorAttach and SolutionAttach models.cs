namespace Sample_BugTracker.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class CorrectSolutionErrorAttachandSolutionAttachmodels : DbMigration
    {
        public override void Up()
        {
            RenameTable(name: "dbo.Attachments", newName: "ErrorAttachments");
            CreateTable(
                "dbo.SolutionAttachments",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        UploadDate = c.DateTime(),
                        FilePath = c.String(),
                        AuthorId = c.String(maxLength: 128),
                        SolutionId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.AspNetUsers", t => t.AuthorId)
                .ForeignKey("dbo.ErrorSolutions", t => t.SolutionId, cascadeDelete: true)
                .Index(t => t.AuthorId)
                .Index(t => t.SolutionId);
            
            AddColumn("dbo.ErrorAttachments", "UploadDate", c => c.DateTime());
            AddColumn("dbo.ErrorSolutions", "RecievingDate", c => c.DateTime());
            DropColumn("dbo.ErrorAttachments", "DateAttachment");
            DropColumn("dbo.ErrorSolutions", "DateSolution");
        }
        
        public override void Down()
        {
            AddColumn("dbo.ErrorSolutions", "DateSolution", c => c.DateTime());
            AddColumn("dbo.ErrorAttachments", "DateAttachment", c => c.DateTime());
            DropForeignKey("dbo.SolutionAttachments", "SolutionId", "dbo.ErrorSolutions");
            DropForeignKey("dbo.SolutionAttachments", "AuthorId", "dbo.AspNetUsers");
            DropIndex("dbo.SolutionAttachments", new[] { "SolutionId" });
            DropIndex("dbo.SolutionAttachments", new[] { "AuthorId" });
            DropColumn("dbo.ErrorSolutions", "RecievingDate");
            DropColumn("dbo.ErrorAttachments", "UploadDate");
            DropTable("dbo.SolutionAttachments");
            RenameTable(name: "dbo.ErrorAttachments", newName: "Attachments");
        }
    }
}
