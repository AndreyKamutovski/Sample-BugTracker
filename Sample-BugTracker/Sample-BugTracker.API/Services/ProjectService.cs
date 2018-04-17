using AutoMapper;
using Sample_BugTracker.API.DTO;
using Sample_BugTracker.API.Exceptions;
using Sample_BugTracker.DAL.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Web;

namespace Sample_BugTracker.API.Services
{

    public class ProjectService : BaseService
    {
        private MailService _mailService = new MailService();

        public ProjectDTO GetById(int projectId)
        {
            using (UoW)
            {
                Project project = UoW.Projects.Get(projectId);
                if (project == null)
                {
                    throw new ApplicationOperationException(string.Format("Project with id {0} not found", projectId), HttpStatusCode.NotFound);
                }
                return Mapper.Map<ProjectDTO>(project);
            }
        }


        public IEnumerable<ProjectDTO> GetPortalProjects(string portalId)
        {
            using (UoW)
            {
                //Guid portalGuid;
                //if(!Guid.TryParse(portalId, out portalGuid))
                //{
                //    throw new ApplicationOperationException(string.Format("Portal GUID: {0} is invalid", portalId), HttpStatusCode.BadRequest);
                //}

                //var portal = UoW.Portals.Get(portalId.);
                var portal = UoW.Portals.Get(portalId);
                if (portal == null)
                {
                    throw new ApplicationOperationException(string.Format("Portal with id {0} not found", portalId), HttpStatusCode.NotFound);
                }
                var projects = CurrentUser.UserProjects.Select(up => up.Project).Where(p => p.PortalId == portal.Id).ToList();
                return Mapper.Map<List<ProjectDTO>>(projects);
            }
        }

        public ProjectDTO Add(ProjectDTO _project)
        {
            using (UoW)
            {
                Project project = Mapper.Map<Project>(_project);
                project.Portal = CurrentUser.Portal;
                UoW.Projects.Add(project);
                var userProject = new UserProject() { Project = project, Worker = CurrentUser, Role = UoW.Roles.GetByName("Admin") };
                UoW.UserProjects.Add(userProject);
                UoW.Complete();
                return Mapper.Map<ProjectDTO>(project);
            }
        }

        public void AttachUser(AttachUserDTO attachUser)
        {
            using (UoW)
            {
                AppUser user = UoW.Users.GetByEmail(attachUser.Email);
                Project project = UoW.Projects.Get(attachUser.ProjectId);
                if (user == null) // значит в системе нет но к поекту надо прикрепить
                {
                    AppRole role = UoW.Roles.GetByName(attachUser.RoleName);
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
                }
                if (user != null)
                {
                    AttachUserToProject(attachUser);
                }
            }
        }

        public void ConfirmAttachmentUser(ConfirmAttachmentUserDTO confirmUser)
        {
            using (UoW)
            {
                Guid id;
                if(!Guid.TryParse(confirmUser.guid, out id))
                {
                    throw new ApplicationOperationException(string.Format("Guid {0} is invalid", confirmUser.guid), HttpStatusCode.BadRequest);
                }
                var awaitAttach = UoW.AwaitingAttachmentUsers.Get(id);
                if(awaitAttach == null)
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
    }
}