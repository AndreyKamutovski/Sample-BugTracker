using Microsoft.AspNet.Identity.EntityFramework;

namespace Sample_BugTracker.DAL.Entities
{
    public class Portal
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string OwnerId { get; set; }
        public AppUser Owner { get; set; }
    }
}
