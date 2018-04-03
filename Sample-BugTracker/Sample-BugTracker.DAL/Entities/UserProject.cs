using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Sample_BugTracker.DAL.Entities
{
    public class UserProject
    {
        [Key, Column(Order = 0)]
        [ForeignKey("Project")]
        public int ProjectId { get; set; }
        [ForeignKey("Worker")]
        [Key, Column(Order = 1)]
        public string WorkerId { get; set; }

        public virtual Project Project { get; set; }
        public virtual AppUser Worker { get; set; }

        public string Role { get; set; }
    }
}

// https://stackoverflow.com/questions/7050404/create-code-first-many-to-many-with-additional-fields-in-association-table
