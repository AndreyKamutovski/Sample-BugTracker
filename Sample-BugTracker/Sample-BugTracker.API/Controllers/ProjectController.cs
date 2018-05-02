using Sample_BugTracker.API.DTO;
using Sample_BugTracker.API.Filters;
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
    [RoutePrefix("api/project")]
    public class ProjectController : ApiController
    {
        private ProjectService _projectService = new ProjectService();

        [Route("{id:int:min(1)}")]
        public ProjectDTO GetById([Required] int id)
        {
            return _projectService.GetById(id);
        }

        [Route("{id:int:min(1)}/errors")]
        public IEnumerable<ErrorDTO> GetProjectErrors([Required] int id)
        {
            return _projectService.GetProjectErrors(id);
        }

        [Route("{id:int:min(1)}/users")]
        public IEnumerable<UserDTO> GetProjectUsers([Required]int id)
        {
            return _projectService.GetProjectUsers(id);
        }

        [Route("{id:int:min(1)}/workers")]
        public IEnumerable<UserDTO> GetProjectWorkers([Required]int id)
        {
            return _projectService.GetProjectWorkers(id);
        }

        [Route("{id:int:min(1)}/owner")]
        public UserDTO GetProjectOwner([Required] int id)
        {
            return _projectService.GetProjectOwner(id);
        }

        [HttpPost]
        [Route("")]
        [ProjectAuthorizationAttribute]
        public ProjectDTO Add([Required] ProjectDTO projectDto)
        {
            return _projectService.Add(projectDto);
        }

        [HttpPut]
        [Route("{id:int:min(1)}")]
        [ProjectAuthorizationAttribute]
        public ProjectDTO Update([Required] int id, [Required] ProjectDTO projectDto)
        {
            return _projectService.Update(id, projectDto);
        }

        [Route("{id:int:min(1)}")]
        [ProjectAuthorizationAttribute]
        public void Delete([Required] int id)
        {
            _projectService.Delete(id);
        }

  
        //public string GetUserRoleForProject([Required] int projectId)
        //{
        //    return _projectService.GetUserRoleForProject(projectId);
        //}
    }
}
