﻿using Sample_BugTracker.API.DTO;
using Sample_BugTracker.API.Services;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;

using System.Web.Http;

namespace Sample_BugTracker.API.Controllers
{
    [Authorize]
    public class ProjectController : ApiController
    {
        private ProjectService _projectService = new ProjectService();

        public ProjectDTO GetById([Required] int projectId)
        {
            return _projectService.GetById(projectId);
        }

        public IEnumerable<ProjectDTO> GetPortalProjects([Required] string portalId)
        {
            return _projectService.GetPortalProjects(portalId);
        }

        [HttpPost]
        public ProjectDTO Add([Required] ProjectDTO project)
        {
            return _projectService.Add(project);
        }

        [HttpPost]
        public ProjectDTO Edit([Required] ProjectDTO project)
        {
            return _projectService.Edit(project);
        }

        public void Delete([Required] int projectId)
        {
            _projectService.Delete(projectId);
        }

  
        //public string GetUserRoleForProject([Required] int projectId)
        //{
        //    return _projectService.GetUserRoleForProject(projectId);
        //}
    }
}
