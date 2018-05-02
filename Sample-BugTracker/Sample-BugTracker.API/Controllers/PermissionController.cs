using Sample_BugTracker.API.Services;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Sample_BugTracker.API.Controllers
{
    [Authorize]
    [RoutePrefix("api/permission")]
    public class PermissionController : ApiController
    {
        PermissionService _permissionService = new PermissionService();

        [HttpGet]
        [Route("project/{projectId:int:min(1)}")]
        public bool GetProjectPermission([Required] int projectId)
        {
            return _permissionService.CanChangeAssignee(projectId);
        }
    }
}
