namespace Sample_BugTracker.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddErrorSolutionandAttachmententites : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Attachments",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        DateAttachment = c.DateTime(),
                        FilePath = c.String(),
                        AuthorId = c.String(maxLength: 128),
                        ErrorId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.AspNetUsers", t => t.AuthorId)
                .ForeignKey("dbo.Errors", t => t.ErrorId, cascadeDelete: true)
                .Index(t => t.AuthorId)
                .Index(t => t.ErrorId);
            
            CreateTable(
                "dbo.ErrorSolutions",
                c => new
                    {
                        Id = c.Int(nullable: false),
                        Description = c.String(),
                        DateSolution = c.DateTime(),
                        AuthorId = c.String(maxLength: 128),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.AspNetUsers", t => t.AuthorId)
                .ForeignKey("dbo.Errors", t => t.Id)
                .Index(t => t.Id)
                .Index(t => t.AuthorId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.ErrorSolutions", "Id", "dbo.Errors");
            DropForeignKey("dbo.ErrorSolutions", "AuthorId", "dbo.AspNetUsers");
            DropForeignKey("dbo.Attachments", "ErrorId", "dbo.Errors");
            DropForeignKey("dbo.Attachments", "AuthorId", "dbo.AspNetUsers");
            DropIndex("dbo.ErrorSolutions", new[] { "AuthorId" });
            DropIndex("dbo.ErrorSolutions", new[] { "Id" });
            DropIndex("dbo.Attachments", new[] { "ErrorId" });
            DropIndex("dbo.Attachments", new[] { "AuthorId" });
            DropTable("dbo.ErrorSolutions");
            DropTable("dbo.Attachments");
        }
    }
}
