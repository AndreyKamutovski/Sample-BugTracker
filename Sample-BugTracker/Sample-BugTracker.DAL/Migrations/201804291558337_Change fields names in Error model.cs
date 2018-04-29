namespace Sample_BugTracker.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ChangefieldsnamesinErrormodel : DbMigration
    {
        public override void Up()
        {
            RenameColumn(table: "dbo.Errors", name: "ErrorAuthorId", newName: "AssigneeId");
            RenameColumn(table: "dbo.Errors", name: "ErrorResponsibleId", newName: "AuthorId");
            RenameIndex(table: "dbo.Errors", name: "IX_ErrorResponsibleId", newName: "IX_AuthorId");
            RenameIndex(table: "dbo.Errors", name: "IX_ErrorAuthorId", newName: "IX_AssigneeId");
        }
        
        public override void Down()
        {
            RenameIndex(table: "dbo.Errors", name: "IX_AssigneeId", newName: "IX_ErrorAuthorId");
            RenameIndex(table: "dbo.Errors", name: "IX_AuthorId", newName: "IX_ErrorResponsibleId");
            RenameColumn(table: "dbo.Errors", name: "AuthorId", newName: "ErrorResponsibleId");
            RenameColumn(table: "dbo.Errors", name: "AssigneeId", newName: "ErrorAuthorId");
        }
    }
}
