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


namespace Sample_BugTracker.API.Services
{

    public class ProjectService : BaseService
    {
        public IEnumerable<ProjectDTO> GetAll()
        {
            using (UoW)
            {
                return Mapper.Map<List<ProjectDTO>>(CurrentUser.UserProjects.Select(up => up.Project));
            }
        }

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

        public bool AttachUser([Required] AttachUserDTO attachUser)
        {
            using (UoW)
            {
                AppUser user = UoW.Users.GetByEmail(attachUser.Email);
                if (user == null)
                {
                    throw new ApplicationOperationException(string.Format("User with email {0} not found", attachUser.Email), HttpStatusCode.NotFound);
                }
                Project project = UoW.Projects.Get(attachUser.ProjectId);
                if (project == null)
                {
                    throw new ApplicationOperationException(string.Format("Project with id {0} not found", attachUser.ProjectId), HttpStatusCode.NotFound);
                }
                AppRole role = UoW.Roles.GetByName(attachUser.RoleName);
                if (role == null)
                {
                    throw new ApplicationOperationException(string.Format("Role with name {0} not found", attachUser.RoleName), HttpStatusCode.NotFound);
                }
                var userProjects = UoW.UserProjects.Find(up => (up.ProjectId == project.Id && up.WorkerId == user.Id));
                if (userProjects.Count() > 0)
                {
                    throw new ApplicationOperationException(string.Format("User with email {0} already attach to project {1}", user.Email, project.Title), HttpStatusCode.Conflict);
                }
                UserProject userProject = new UserProject() { Project = project, Worker = user, Role = role };
                UoW.UserProjects.Add(userProject);
                UoW.Complete();
                return true;
            }
        }
    }
}