namespace Sample_BugTracker.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Addpermissions : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Permissions",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Description = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.PermissionAppRoles",
                c => new
                    {
                        Permission_Id = c.Int(nullable: false),
                        AppRole_Id = c.String(nullable: false, maxLength: 128),
                    })
                .PrimaryKey(t => new { t.Permission_Id, t.AppRole_Id })
                .ForeignKey("dbo.Permissions", t => t.Permission_Id, cascadeDelete: true)
                .ForeignKey("dbo.AspNetRoles", t => t.AppRole_Id, cascadeDelete: true)
                .Index(t => t.Permission_Id)
                .Index(t => t.AppRole_Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.PermissionAppRoles", "AppRole_Id", "dbo.AspNetRoles");
            DropForeignKey("dbo.PermissionAppRoles", "Permission_Id", "dbo.Permissions");
            DropIndex("dbo.PermissionAppRoles", new[] { "AppRole_Id" });
            DropIndex("dbo.PermissionAppRoles", new[] { "Permission_Id" });
            DropTable("dbo.PermissionAppRoles");
            DropTable("dbo.Permissions");
        }
    }
}
