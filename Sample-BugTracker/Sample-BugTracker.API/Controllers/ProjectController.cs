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

        public IEnumerable<ProjectDTO> GetAll()
        {
            return _projectService.GetAll();
        }

        public ProjectDTO GetById([Required] int id)
        {
            return _projectService.GetById(id);
        }

        [HttpPost]
        public ProjectDTO Add([Required] ProjectDTO project)
        {
            return _projectService.Add(project);
        }

        [HttpPost]
        [Route("api/Project/AttachUser")]
        public bool AttachUser([Required] AttachUserDTO attachUser)
        {
            return _projectService.AttachUser(attachUser);
        }
    }
}
