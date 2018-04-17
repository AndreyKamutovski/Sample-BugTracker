namespace Sample_BugTracker.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Addfieldstoerrordomenmodel : DbMigration
    {
        public override void Up()
        {
            RenameColumn(table: "dbo.Errors", name: "WorkerId", newName: "AppUser_Id");
            RenameIndex(table: "dbo.Errors", name: "IX_WorkerId", newName: "IX_AppUser_Id");
            AddColumn("dbo.Errors", "Deadline", c => c.DateTime(nullable: false));
            AddColumn("dbo.Errors", "Classification", c => c.Int(nullable: false));
            AddColumn("dbo.Errors", "ErrorAuthorId", c => c.String(maxLength: 128));
            AddColumn("dbo.Errors", "ErrorResponsibleId", c => c.String(maxLength: 128));
            CreateIndex("dbo.Errors", "ErrorAuthorId");
            CreateIndex("dbo.Errors", "ErrorResponsibleId");
            AddForeignKey("dbo.Errors", "ErrorAuthorId", "dbo.AspNetUsers", "Id");
            AddForeignKey("dbo.Errors", "ErrorResponsibleId", "dbo.AspNetUsers", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Errors", "ErrorResponsibleId", "dbo.AspNetUsers");
            DropForeignKey("dbo.Errors", "ErrorAuthorId", "dbo.AspNetUsers");
            DropIndex("dbo.Errors", new[] { "ErrorResponsibleId" });
            DropIndex("dbo.Errors", new[] { "ErrorAuthorId" });
            DropColumn("dbo.Errors", "ErrorResponsibleId");
            DropColumn("dbo.Errors", "ErrorAuthorId");
            DropColumn("dbo.Errors", "Classification");
            DropColumn("dbo.Errors", "Deadline");
            RenameIndex(table: "dbo.Errors", name: "IX_AppUser_Id", newName: "IX_WorkerId");
            RenameColumn(table: "dbo.Errors", name: "AppUser_Id", newName: "WorkerId");
        }
    }
}
