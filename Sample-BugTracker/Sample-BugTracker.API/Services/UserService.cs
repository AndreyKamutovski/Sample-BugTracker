using AutoMapper;
using Sample_BugTracker.API.DTO;
using Sample_BugTracker.API.DTO.User;
using Sample_BugTracker.API.Exceptions;
using Sample_BugTracker.API.Providers;
using Sample_BugTracker.DAL.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace Sample_BugTracker.API.Services
{
    public class UserService : BaseService
    {
        private MailService _mailService = new MailService();
        public readonly string root;

        public UserService()
        {
            root = HttpContext.Current.Server.MapPath("~/Content/Avatars");
        }

        public bool IsEmailAvailable(string email)
        {
            using (UoW)
            {
                return UoW.Users.IsEmailAvailable(email);
            }
        }

        public IEnumerable<PortalDTO> GetUserPortals()
        {
            using (UoW)
            {
                var portals = CurrentUser.UserProjects.Select(up => up.Project.Portal).ToList();
                if (CurrentUser.Portal != null)  // т.к. его могут прикрепить к проекту и он не имеет собственного портала
                {
                    portals.Add(CurrentUser.Portal);
                }
                return Mapper.Map<List<PortalDTO>>(portals.Distinct());
            }
        }

        public bool UserHavePortal()
        {
            return CurrentUser.Portal != null ? true : false;
        }

        public IEnumerable<UserDTO> GetAll()
        {
            using (UoW)
            {
                return Mapper.Map<List<UserDTO>>(UoW.Users.GetAll());
            }
        }

        public UserDTO GetCurrentUser()
        {
            var userDto = Mapper.Map<UserDTO>(CurrentUser);
            userDto.AvatarBase64 = GetAvatarBase64(CurrentUser.Avatar);
            return userDto;
        }

        public IEnumerable<UserDTO> GetAttachableUsers(int projectId)
        {
            using (UoW)
            {
                Project project = UoW.Projects.Get(projectId);
                if (project == null)
                {
                    throw new ApplicationOperationException(string.Format("Project with id {0} not found", projectId), HttpStatusCode.NotFound);
                }
                var attachedUsers = project.UserProjects.Select(up => up.Worker).ToList();
                var attachableUsers = UoW.Users.GetAll().Except(attachedUsers);
                return Mapper.Map<List<UserDTO>>(attachableUsers);
            }
        }

        public async Task<string> UploadUserAvatar(HttpRequestMessage request)
        {
            // Check if the request contains multipart/form-data.
            if (!request.Content.IsMimeMultipartContent())
            {
                throw new ApplicationOperationException("", HttpStatusCode.UnsupportedMediaType);
            }

            try
            {
                if (CurrentUser.Avatar != null)
                {
                    string deletedAvatarPath = HttpContext.Current.Server.MapPath(string.Format("~/{0}", CurrentUser.Avatar));
                    if (System.IO.File.Exists(deletedAvatarPath))
                    {
                        // Use a try block to catch IOExceptions, to
                        // handle the case of the file already being
                        // opened by another process.
                        System.IO.File.Delete(deletedAvatarPath);
                    }
                }
                string rootAvatarFolder = HttpContext.Current.Server.MapPath("~/Content/Avatars");
                var provider = new StreamProvider(rootAvatarFolder);

                // Read the form data
                await request.Content.ReadAsMultipartAsync(provider);
                string fileName = string.Empty;
                using (UoW)
                {
                    var file = provider.FileData.FirstOrDefault();
                    if (file != null)
                    {
                        AppUser user = UoW.Users.GetByEmail(CurrentUser.Email);
                        fileName = file.LocalFileName.Substring(file.LocalFileName.LastIndexOf('\\') + 1);
                        user.Avatar = fileName;
                        UoW.Complete();
                    }
                    else
                    {
                        throw new ApplicationOperationException("For an avatar you need one image", HttpStatusCode.BadRequest);
                    }
                }
                return GetAvatarBase64(fileName);
            }
            catch (System.Exception e)
            {
                throw new ApplicationOperationException(e.Message, HttpStatusCode.InternalServerError);
            }
        }

        public UserDTO AttachUser(AttachUserDTO attachUserDto)
        {
            using (UoW)
            {
                AppUser user = UoW.Users.GetByEmail(attachUserDto.Email);
                Project project = UoW.Projects.Get(attachUserDto.ProjectId);
                AppRole role = UoW.Roles.GetByName(attachUserDto.RoleName);
                if (user == null) // значит в системе нет но к поекту надо прикрепить
                {
                    var guid = Guid.NewGuid();
                    var attachmentUser = new AwaitingAttachmentUser()
                    {
                        Id = guid,
                        Email = attachUserDto.Email,
                        Project = project,
                        Role = role
                    };
                    UoW.AwaitingAttachmentUsers.Add(attachmentUser);
                    UoW.Complete();
                    var uriBuilder = new UriBuilder(string.Format("http://localhost:4200/confirmUser/{0}", guid));
                    //var parameters = HttpUtility.ParseQueryString(string.Empty);
                    //parameters["id"] = guid.ToString();
                    //uriBuilder.Query = parameters.ToString();
                    Uri finalUrl = uriBuilder.Uri;

                    string bodyMsg = string.Format(
                        "<span>Здравствуйте, уважаемый <strong>{0}</strong>! Вы приглашены к участию в проекте &laquo;{1}&raquo; Перейдите по <a href=\"{2}\">ссылке</a> для подтверждения пароля.</span>",
                        attachUserDto.Email.Substring(0, attachUserDto.Email.IndexOf("@")),
                        project.Title,
                        finalUrl.ToString()
                        );

                    _mailService.Send(
                        attachUserDto.Email,
                        "Sample Bug Tracker",
                        bodyMsg,
                        true
                       );
                    return null;
                }

                AttachUserToProject(attachUserDto);
                var userDto = Mapper.Map<UserDTO>(user);
                userDto.RoleName = role.Name;
                return userDto;
            }
        }

        public UserDTO UpdateAttachedUser(AttachUserDTO updateUserDto)
        {
            using (UoW)
            {
                var user = UoW.Users.GetByEmail(updateUserDto.Email);
                var role = UoW.Roles.GetByName(updateUserDto.RoleName);
                var userProject = UoW.UserProjects.Find(up => up.ProjectId == updateUserDto.ProjectId && up.WorkerId == user.Id).FirstOrDefault();
                userProject.Role = role;
                UoW.Complete();
                return Mapper.Map<UserDTO>(userProject);
            }
        }

        public string ConfirmAttachmentUser(ConfirmAttachmentUserDTO confirmUserDto)
        {
            using (UoW)
            {
                Guid id;
                string portalName = "";
                if (!Guid.TryParse(confirmUserDto.guid, out id))
                {
                    throw new ApplicationOperationException(string.Format("Guid {0} is invalid", confirmUserDto.guid), HttpStatusCode.BadRequest);
                }
                var awaitAttach = UoW.AwaitingAttachmentUsers.Get(id);
                if (awaitAttach == null)
                {
                    throw new ApplicationOperationException(string.Format("AwaitingAttachmentUser row with guid {0} not found", confirmUserDto.guid), HttpStatusCode.NotFound);
                }
                var attachUser = new AttachUserDTO() { Email = awaitAttach.Email, RoleName = awaitAttach.Role.Name, ProjectId = awaitAttach.ProjectId };
                var user = new AppUser() { Email = attachUser.Email, UserName = attachUser.Email };
                UoW.Users.Add(user, confirmUserDto.Password, attachUser.RoleName);
                //portalName = user.Portal.Title;
                UoW.Complete();
                AttachUserToProject(attachUser);
                UoW.AwaitingAttachmentUsers.Remove(awaitAttach);
                UoW.Complete();
                return portalName;
            }
        }

        private void AttachUserToProject(AttachUserDTO attachUserDto)
        {
            using (var uow = CreateUnitOfWork())
            {
                Project project = uow.Projects.Get(attachUserDto.ProjectId);
                if (project == null)
                {
                    throw new ApplicationOperationException(string.Format("Project with id {0} not found", attachUserDto.ProjectId), HttpStatusCode.NotFound);
                }
                AppUser user = uow.Users.GetByEmail(attachUserDto.Email);
                if (user == null)
                {
                    throw new ApplicationOperationException(string.Format("User with email {0} not found", attachUserDto.Email), HttpStatusCode.NotFound);
                }

                AppRole role = uow.Roles.GetByName(attachUserDto.RoleName);
                if (role == null)
                {
                    throw new ApplicationOperationException(string.Format("Role with name {0} not found", attachUserDto.RoleName), HttpStatusCode.NotFound);
                }
                var userProjects = uow.UserProjects.Find(up => (up.ProjectId == project.Id && up.WorkerId == user.Id));
                if (userProjects.Count() > 0)
                {
                    throw new ApplicationOperationException(string.Format("User with email {0} already attach to project {1}", user.Email, project.Title), HttpStatusCode.Conflict);
                }
                UserProject userProject = new UserProject() { Project = project, Worker = user, Role = role };
                uow.UserProjects.Add(userProject);
                uow.Complete();
            }
        }

        public void UnattachUser(UnattachUserDTO unattachUserDto)
        {
            using (UoW)
            {
                Project project = UoW.Projects.Get(unattachUserDto.ProjectId);
                if (project == null)
                {
                    throw new ApplicationOperationException(string.Format("Project with id {0} not found", unattachUserDto.ProjectId), HttpStatusCode.NotFound);
                }
                AppUser user = UoW.Users.GetByEmail(unattachUserDto.Email);
                if (user == null)
                {
                    throw new ApplicationOperationException(string.Format("User with email {0} not found", unattachUserDto.Email), HttpStatusCode.NotFound);
                }
                var userProject = UoW.UserProjects.Find(up => up.ProjectId == project.Id && up.WorkerId == user.Id).FirstOrDefault();
                if (userProject == null)
                {
                    throw new ApplicationOperationException(string.Format("User with email {0} not attached to project {1}", unattachUserDto.Email, project.Title), HttpStatusCode.NotFound);
                }
                UoW.UserProjects.Remove(userProject);
                var errors = project.Errors.Where(e => e.AuthorId == user.Id);
                foreach (var error in errors)
                {
                    error.Assignee = null;
                    error.AssigneeId = null;
                }
                UoW.Complete();
            }
        }

        public string GetAvatarBase64(string avatarFileName)
        {
            try
            {
                    if (avatarFileName != null)
                    {
                        var filePath = Path.Combine(root, avatarFileName);
                        var mimeType = MimeMapping.GetMimeMapping(avatarFileName);
                        byte[] imageArray = System.IO.File.ReadAllBytes(filePath);
                        string base64ImageRepresentation = Convert.ToBase64String(imageArray);
                        base64ImageRepresentation = string.Format("data:{0};base64,{1}",mimeType, base64ImageRepresentation);
                        return base64ImageRepresentation;
                    }
                    else return null;
            }
            catch (System.Exception e)
            {
                throw new ApplicationOperationException(e.Message, HttpStatusCode.InternalServerError);
            }
        }
    }
}