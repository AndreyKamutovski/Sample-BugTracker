namespace Sample_BugTracker.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddDescfieldtoErrordomenmodel : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Errors", "Description", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Errors", "Description");
        }
    }
}
