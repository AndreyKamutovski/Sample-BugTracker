using Sample_BugTracker.API.DTO.Permission;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Sample_BugTracker.API.DTO
{
    public class ProjectPermissionDTO
    {
        public ErrorPermissionDTO ErrorPermission { get; set; }
        public UsersPermissionDTO UsersPermission { get; set; }
    }
}