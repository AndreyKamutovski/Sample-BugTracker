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
    [RoutePrefix("api/user")]
    public class UserController : ApiController
    {
        private UserService _userService = new UserService();

        [Route("")]
        public IEnumerable<UserDTO> GetAll()
        {
            return _userService.GetAll();
        }

        [Route("portals")]
        public IEnumerable<PortalDTO> GetUserPortals()
        {
            return _userService.GetUserPortals();
        }

        [Route("current")]
        public UserDTO GetCurrentUser()
        {
            return _userService.GetCurrentUser();
        }

        [Route("")]
        public IEnumerable<UserDTO> GetAttachableUsers([Required] int projectId)
        {
            return _userService.GetAttachableUsers(projectId);
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("")]
        public bool IsEmailAvailable([Required] string email)
        {
            return _userService.IsEmailAvailable(email);
        }

        [HttpPost]
        [Route("")]
        public async Task<string> UploadUserAvatar()
        {
            return await _userService.UploadUserAvatar(Request);
        }

        [HttpPost]
        [Route("attach")]
        public UserDTO AttachUser([Required] AttachUserDTO attachUserDto)
        {
            return _userService.AttachUser(attachUserDto);
        }

        [HttpPut]
        [Route("update")]
        public UserDTO UpdateAttachedUser([Required] AttachUserDTO updateUserDto)
        {
            return _userService.UpdateAttachedUser(updateUserDto);
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("confirm")]
        public void ConfirmAttachmentUser([Required] ConfirmAttachmentUserDTO confirmUserDto)
        {
            _userService.ConfirmAttachmentUser(confirmUserDto);
        }

        [HttpPost]
        [Route("unattach")]
        public void UnattachUser([Required] UnattachUserDTO unattachUserDto)
        {
            _userService.UnattachUser(unattachUserDto);
        }
    }
}
