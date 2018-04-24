using Sample_BugTracker.API.DTO;
using Sample_BugTracker.API.Services;
using Sample_BugTracker.DAL.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
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

        public IEnumerable<UserDTO> GetProjectWorkers([Required]int projectId)
        {
            return _userService.GetProjectWorkers(projectId);
        }

        public IEnumerable<UserDTO> GetAll()
        {
            return _userService.GetAll();
        }

        public UserDTO GetCurrentUser()
        {
            return _userService.GetCurrentUser();
        }

        public UserDTO GetProjectOwner([Required] int projectId)
        {
            return _userService.GetProjectOwner(projectId);
        }

        public IEnumerable<UserDTO> GetAttachableUsers([Required] int projectId)
        {
            return _userService.GetAttachableUsers(projectId);
        }

        [HttpPost]
        public async Task<string> UploadUserAvatar()
        {
            return  await _userService.UploadUserAvatar(Request);
        }

        [HttpPost]
        public UserDTO AttachUser([Required] AttachUserDTO attachUser)
        {
            return _userService.AttachUser(attachUser);
        }

        [HttpPost]
        public UserDTO EditAttachedUser([Required] AttachUserDTO editUser)
        {
            return _userService.EditAttachedUser(editUser);
        }

        [HttpPost]
        [AllowAnonymous]
        public void ConfirmAttachmentUser([Required] ConfirmAttachmentUserDTO confirmUser)
        {
            _userService.ConfirmAttachmentUser(confirmUser);
        }

        [HttpPost]
        public void UnattachUser([Required] UnattachUserDTO unattachUser)
        {
            _userService.UnattachUser(unattachUser);
        }
    }
}
