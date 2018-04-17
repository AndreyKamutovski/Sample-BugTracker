using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sample_BugTracker.DAL.Enumerations
{
    public enum Status
    {
        OPEN = 1,
        DECIDED,
        NECESSARYTEST,
        CLOSED
    }

    public enum Priority
    {
        CRITICAL = 1,
        HIGH,
        MIDDLE,
        LOW
    }

    public enum Classification
    {
        SECURITY = 1,
        CRASHORHANG,
        DATALOSS,
        PERFORMANCE,
        UI,
        OTHERERROR
    }
}
