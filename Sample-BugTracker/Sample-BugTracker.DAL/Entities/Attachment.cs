using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sample_BugTracker.DAL.Entities
{
    public class Attachment
    {
        public int Id { get; set; }

        public DateTime? DateAttachment { get; set; }

        public string FilePath { get; set; }

        public string AuthorId { get; set; }
        public virtual AppUser Author { get; set; }

        public int ErrorId { get; set; }
        public virtual Error Error { get; set; }
    }
}
