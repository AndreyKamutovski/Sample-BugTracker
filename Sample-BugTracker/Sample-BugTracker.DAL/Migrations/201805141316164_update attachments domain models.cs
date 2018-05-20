namespace Sample_BugTracker.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class updateattachmentsdomainmodels : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.ErrorAttachments", "FileName", c => c.String());
            AddColumn("dbo.ErrorAttachments", "OriginalFileName", c => c.String());
            AddColumn("dbo.SolutionAttachments", "FileName", c => c.String());
            AddColumn("dbo.SolutionAttachments", "OriginalFileName", c => c.String());
            DropColumn("dbo.ErrorAttachments", "FilePath");
            DropColumn("dbo.SolutionAttachments", "FilePath");
        }
        
        public override void Down()
        {
            AddColumn("dbo.SolutionAttachments", "FilePath", c => c.String());
            AddColumn("dbo.ErrorAttachments", "FilePath", c => c.String());
            DropColumn("dbo.SolutionAttachments", "OriginalFileName");
            DropColumn("dbo.SolutionAttachments", "FileName");
            DropColumn("dbo.ErrorAttachments", "OriginalFileName");
            DropColumn("dbo.ErrorAttachments", "FileName");
        }
    }
}
