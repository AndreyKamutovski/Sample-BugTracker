using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sample_BugTracker.DAL.Entities
{
    public class SolutionAttachment : BaseAttachment
    {
        public int SolutionId { get; set; }
        public virtual ErrorSolution Solution { get; set; }
    }
}
