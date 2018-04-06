using Sample_BugTracker.API.DTO;
using Sample_BugTracker.API.Services;
using Sample_BugTracker.DAL.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;

namespace Sample_BugTracker.API.Controllers
{
    [Authorize]
    public class UserController : ApiController
    {
        private UserService _userService = new UserService();

        [HttpGet]
        [AllowAnonymous]
        public bool CheckEmailNotTaken([Required]string email)
        {
            return _userService.CheckEmailNotTaken(email);
        }

        public IEnumerable<UserDTO> GetProjectUsers([Required]int projectId)
        {
            return _userService.GetProjectUsers(projectId);
        }

        public IEnumerable<UserDTO> GetAll()
        {
            return _userService.GetAll();
        }

        [Route("api/User/AttachableUsers")]
        public IEnumerable<UserDTO> GetAttachableUsersForProject([Required] int projectId)
        {
            return _userService.GetAttachableUsersForProject(projectId);
        }
    }
}
