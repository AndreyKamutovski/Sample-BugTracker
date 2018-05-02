using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Sample_BugTracker.API.DTO.Permission
{
    public class ErrorPermissionDTO
    {
        public bool CanChangeAssignee { get; set; }
        public bool CanChangeDeadline { get; set; }
        public bool CanChangeStatus { get; set; }

        public bool CanChangePriority { get; set; }

        public bool CanChangeClassification { get; set; }
    }
}