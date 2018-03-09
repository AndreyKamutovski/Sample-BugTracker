using Sample_BugTracker.API.DTO;
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
    public class ProjectController : ApiController
    {
        private ProjectService _projectService = new ProjectService();

        [HttpGet]
        public IEnumerable<ProjectDTO> GetAll()
        {
            return _projectService.GetAll();
        }

        [HttpPost]
        public void Add([Required] ProjectDTO project)
        {
            _projectService.Add(project);
        }
    }
}
