using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sample_BugTracker.DAL.Entities
{
    public class BaseAttachment
    {
        public int Id { get; set; }

        public DateTime? UploadDate { get; set; }

        public string FileName { get; set; }

        public string OriginalFileName { get; set; }

        public string AuthorId { get; set; }
        public virtual AppUser Author { get; set; }
    }
}
