// <auto-generated />
namespace Sample_BugTracker.DAL.Migrations
{
    using System.CodeDom.Compiler;
    using System.Data.Entity.Migrations;
    using System.Data.Entity.Migrations.Infrastructure;
    using System.Resources;
    
    [GeneratedCode("EntityFramework.Migrations", "6.2.0-61023")]
    public sealed partial class Manytomanycustomjointable : IMigrationMetadata
    {
        private readonly ResourceManager Resources = new ResourceManager(typeof(Manytomanycustomjointable));
        
        string IMigrationMetadata.Id
        {
            get { return "201804032127580_Many-to-many custom join table"; }
        }
        
        string IMigrationMetadata.Source
        {
            get { return null; }
        }
        
        string IMigrationMetadata.Target
        {
            get { return Resources.GetString("Target"); }
        }
    }
}
