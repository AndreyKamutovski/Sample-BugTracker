using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Sample_BugTracker.DAL.Entities
{
    public class ErrorSolution
    {
        [Key]
        [ForeignKey("Error")]
        public int Id { get; set; }
        public virtual Error Error { get; set; }

        public string Description { get; set; }

        public DateTime? RecievingDate { get; set; }

        public string AuthorId { get; set; }
        public virtual AppUser Author { get; set; }

        public virtual ICollection<SolutionAttachment> Attachments { get; set; }
    }
}
