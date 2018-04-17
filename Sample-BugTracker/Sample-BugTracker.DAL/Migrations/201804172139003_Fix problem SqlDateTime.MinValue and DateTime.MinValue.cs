namespace Sample_BugTracker.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class FixproblemSqlDateTimeMinValueandDateTimeMinValue : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Errors", "DateCreation", c => c.DateTime());
            AlterColumn("dbo.Errors", "Deadline", c => c.DateTime());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Errors", "Deadline", c => c.DateTime(nullable: false));
            AlterColumn("dbo.Errors", "DateCreation", c => c.DateTime(nullable: false));
        }
    }
}
