using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sample_BugTracker.DAL.Enumerations
{
    public enum Status
    {
        Open = 1,
        Decided,
        Close
    }

    public enum Priority
    {
        Critical = 1,
        High,
        Middle,
        Low
    }
}
