using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sample_BugTracker.DAL.Entities
{
    public class ErrorAttachment: BaseAttachment
    {
        public int ErrorId { get; set; }
        public virtual Error Error { get; set; }
    }
}
