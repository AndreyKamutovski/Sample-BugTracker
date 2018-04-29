using AutoMapper;
using Sample_BugTracker.API.DTO;
using Sample_BugTracker.API.Exceptions;
using Sample_BugTracker.API.Providers;
using Sample_BugTracker.DAL.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace Sample_BugTracker.API.Services
{
    public class UserService : BaseService
    {
        private MailService _mailService = new MailService();


        public bool CheckEmailNotTaken(string email)
        {
            using (UoW)
            {
                AppUser user = UoW.Users.GetByEmail(email);
                return user == null ? true : false;
            }
        }

        public IEnumerable<UserDTO> GetProjectUsers(int projectId)
        {
            using (UoW)
            {
                Project project = UoW.Projects.Get(projectId);
                if (project == null)
                {
                    throw new ApplicationOperationException(string.Format("Project with id {0} not found", projectId), HttpStatusCode.NotFound);
                }
                return Mapper.Map<List<UserDTO>>(project.UserProjects);
            }
        }

        public IEnumerable<UserDTO> GetProjectWorkers(int projectId)
        {
            using (UoW)
            {
                Project project = UoW.Projects.Get(projectId);
                if (project == null)
                {
                    throw new ApplicationOperationException(string.Format("Project with id {0} not found", projectId), HttpStatusCode.NotFound);
                }
                var workers = project.UserProjects.Where(up => up.Role.Name == "Worker").ToList();
                return Mapper.Map<List<UserDTO>>(workers);
            }
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
            return Mapper.Map<UserDTO>(CurrentUser);
        }

        public UserDTO GetProjectOwner(int projectId)
        {
            using (UoW)
            {
                AppUser owner = UoW.Projects.Get(projectId).Portal.Owner;
                return Mapper.Map<UserDTO>(owner);
            }
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
                string rootAvatarFolder = HttpContext.Current.Server.MapPath("~/Avatars");
                var provider = new AvatarStreamProvider(rootAvatarFolder);

                // Read the form data.
                await request.Content.ReadAsMultipartAsync(provider);
                string returningPath = string.Empty;
                using (UoW)
                {
                    var file = provider.FileData.FirstOrDefault();
                    if (file != null)
                    {
                        AppUser user = UoW.Users.GetByEmail(CurrentUser.Email);
                        var fileName = file.LocalFileName.Substring(file.LocalFileName.LastIndexOf('\\') + 1);
                        user.Avatar = returningPath = string.Concat("Avatars/", fileName);
                        UoW.Complete();
                    }
                    else
                    {
                        throw new ApplicationOperationException("For an avatar you need one image", HttpStatusCode.BadRequest);
                    }
                }
                return returningPath;
            }
            catch (System.Exception e)
            {
                throw new ApplicationOperationException(e.Message, HttpStatusCode.InternalServerError);
            }
        }

        public UserDTO AttachUser(AttachUserDTO attachUser)
        {
            using (UoW)
            {
                AppUser user = UoW.Users.GetByEmail(attachUser.Email);
                Project project = UoW.Projects.Get(attachUser.ProjectId);
                AppRole role = UoW.Roles.GetByName(attachUser.RoleName);
                if (user == null) // значит в системе нет но к поекту надо прикрепить
                {
                    var guid = Guid.NewGuid();
                    var attachmentUser = new AwaitingAttachmentUser()
                    {
                        Id = guid,
                        Email = attachUser.Email,
                        Project = project,
                        Role = role
                    };
                    UoW.AwaitingAttachmentUsers.Add(attachmentUser);
                    UoW.Complete();
                    var uriBuilder = new UriBuilder("http://localhost:3000/app/confirmUser");
                    var parameters = HttpUtility.ParseQueryString(string.Empty);
                    parameters["id"] = guid.ToString();
                    uriBuilder.Query = parameters.ToString();
                    Uri finalUrl = uriBuilder.Uri;

                    string bodyMsg = string.Format(
                        "<span>Здравствуйте, уважаемый <strong>{0}</strong>! Вы приглашены к участию в проекте &laquo;{1}&raquo; Перейдите по <a href=\"{2}\">ссылке</a> для подтверждения пароля.</span>",
                        attachUser.Email.Substring(0, attachUser.Email.IndexOf("@")),
                        project.Title,
                        finalUrl.ToString()
                        );

                    _mailService.Send(
                        attachUser.Email,
                        "Sample Bug Tracker",
                        bodyMsg,
                        true
                       );
                    return null;
                }

                AttachUserToProject(attachUser);
                var userDto = Mapper.Map<UserDTO>(user);
                userDto.RoleName = role.Name;
                return userDto;
            }
        }

        public UserDTO EditAttachedUser(AttachUserDTO editUser)
        {
            using (UoW)
            {
                var user = UoW.Users.GetByEmail(editUser.Email);
                var role = UoW.Roles.GetByName(editUser.RoleName);
                var userProject = UoW.UserProjects.Find(up => up.ProjectId == editUser.ProjectId && up.WorkerId == user.Id).FirstOrDefault();
                userProject.Role = role;
                UoW.Complete();
                return Mapper.Map<UserDTO>(userProject);
            }
        }

        public void ConfirmAttachmentUser(ConfirmAttachmentUserDTO confirmUser)
        {
            using (UoW)
            {
                Guid id;
                if (!Guid.TryParse(confirmUser.guid, out id))
                {
                    throw new ApplicationOperationException(string.Format("Guid {0} is invalid", confirmUser.guid), HttpStatusCode.BadRequest);
                }
                var awaitAttach = UoW.AwaitingAttachmentUsers.Get(id);
                if (awaitAttach == null)
                {
                    throw new ApplicationOperationException(string.Format("AwaitingAttachmentUser row with guid {0} not found", confirmUser.guid), HttpStatusCode.NotFound);
                }
                var attachUser = new AttachUserDTO() { Email = awaitAttach.Email, RoleName = awaitAttach.Role.Name, ProjectId = awaitAttach.ProjectId };
                var user = new AppUser() { Email = attachUser.Email, UserName = attachUser.Email };
                UoW.Users.Add(user, confirmUser.Password, attachUser.RoleName);
                UoW.Complete();
                AttachUserToProject(attachUser);
                UoW.AwaitingAttachmentUsers.Remove(awaitAttach);
                UoW.Complete();
            }
        }

        private void AttachUserToProject(AttachUserDTO attachUser)
        {
            using (var uow = CreateUnitOfWork())
            {
                Project project = uow.Projects.Get(attachUser.ProjectId);
                if (project == null)
                {
                    throw new ApplicationOperationException(string.Format("Project with id {0} not found", attachUser.ProjectId), HttpStatusCode.NotFound);
                }
                AppUser user = uow.Users.GetByEmail(attachUser.Email);
                if (user == null)
                {
                    throw new ApplicationOperationException(string.Format("User with email {0} not found", attachUser.Email), HttpStatusCode.NotFound);
                }

                AppRole role = uow.Roles.GetByName(attachUser.RoleName);
                if (role == null)
                {
                    throw new ApplicationOperationException(string.Format("Role with name {0} not found", attachUser.RoleName), HttpStatusCode.NotFound);
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

        public void UnattachUser(UnattachUserDTO unattachUser)
        {
            using (UoW)
            {
                Project project = UoW.Projects.Get(unattachUser.ProjectId);
                if (project == null)
                {
                    throw new ApplicationOperationException(string.Format("Project with id {0} not found", unattachUser.ProjectId), HttpStatusCode.NotFound);
                }
                AppUser user = UoW.Users.GetByEmail(unattachUser.Email);
                if (user == null)
                {
                    throw new ApplicationOperationException(string.Format("User with email {0} not found", unattachUser.Email), HttpStatusCode.NotFound);
                }
                var userProject = UoW.UserProjects.Find(up => up.ProjectId == project.Id && up.WorkerId == user.Id).FirstOrDefault();
                if (userProject == null)
                {
                    throw new ApplicationOperationException(string.Format("User with email {0} not attached to project {1}", unattachUser.Email, project.Title), HttpStatusCode.NotFound);
                }
                UoW.UserProjects.Remove(userProject);
                var errors = project.Errors.Where(e => e.AuthorId == user.Id);
                foreach(var error in errors)
                {
                    error.Assignee = null;
                    error.AssigneeId = null;
                }
                UoW.Complete();
            }
        }
    }
}