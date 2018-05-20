using AutoMapper;
using Sample_BugTracker.API.DTO;
using Sample_BugTracker.API.DTO.Error;
using Sample_BugTracker.API.Exceptions;
using Sample_BugTracker.DAL.Entities;
using Sample_BugTracker.DAL.Enumerations;
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

        public ProjectDTO GetById(int id)
        {
            using (UoW)
            {
                Project project = UoW.Projects.Get(id);
                if (project == null)
                {
                    throw new ApplicationOperationException(string.Format("Project with id {0} not found", id), HttpStatusCode.NotFound);
                }
                return Mapper.Map<ProjectDTO>(project);
            }
        }

        public IEnumerable<ErrorDTO> GetProjectErrors(int id)
        {
            using (UoW)
            {
                var project = UoW.Projects.Get(id);
                if (project == null)
                {
                    throw new ApplicationOperationException(string.Format("Project with id {0} not found", id), HttpStatusCode.NotFound);
                }
                var errors = Mapper.Map<List<ErrorDTO>>(project.Errors);
                var errorsDomain = project.Errors.ToList();
                for(int i = 0; i < errors.Count && i < errorsDomain.Count; i++)
                {
                    errors[i].IsAttachments = (errorsDomain[i].Attachments.Count > 0) ? true : false;
                }
                return errors;
            }
        }

        public IEnumerable<UserDTO> GetProjectUsers(int id)
        {
            using (UoW)
            {
                Project project = UoW.Projects.Get(id);
                if (project == null)
                {
                    throw new ApplicationOperationException(string.Format("Project with id {0} not found", id), HttpStatusCode.NotFound);
                }
                return Mapper.Map<List<UserDTO>>(project.UserProjects);
            }
        }

        public IEnumerable<UserDTO> GetProjectWorkers(int id)
        {
            using (UoW)
            {
                Project project = UoW.Projects.Get(id);
                if (project == null)
                {
                    throw new ApplicationOperationException(string.Format("Project with id {0} not found", id), HttpStatusCode.NotFound);
                }
                var workers = project.UserProjects.Where(up => up.Role.Name == "Worker").ToList();
                return Mapper.Map<List<UserDTO>>(workers);
            }
        }

        public UserDTO GetProjectOwner(int id)
        {
            using (UoW)
            {
                AppUser owner = UoW.Projects.Get(id).Portal.Owner;
                return Mapper.Map<UserDTO>(owner);
            }
        }

        public PermissionList[] GetProjectPermission(int id)
        {
            using (UoW)
            {
                Project project = UoW.Projects.Get(id);
                if (project == null)
                {
                    throw new ApplicationOperationException(string.Format("Project with id {0} not found", id), HttpStatusCode.NotFound);
                }

                var userProject = UoW.UserProjects.Find(up => up.ProjectId == project.Id && up.Worker.Email == CurrentUser.Email).FirstOrDefault();
                if (userProject == null)
                {
                    throw new ApplicationOperationException(string.Format("UserProject for project with id {0} and user email {1} not found", project.Id, CurrentUser.Email), HttpStatusCode.NotFound);
                }
                return userProject.Role.Permission.Select(p => p.Description).ToArray();
            }
        }

        public ProjectDTO Add(ProjectDTO projectDto)
        {
            using (UoW)
            {
                Project project = Mapper.Map<Project>(projectDto);
                project.Portal = CurrentUser.Portal;
                UoW.Projects.Add(project);
                var userProject = new UserProject() { Project = project, Worker = CurrentUser, Role = UoW.Roles.GetByName("Admin") };
                UoW.UserProjects.Add(userProject);
                UoW.Complete();
                return Mapper.Map<ProjectDTO>(project);
            }
        }

        public ProjectDTO Update(int id, ProjectDTO projectDto)
        {
            using (UoW)
            {
                Project project = UoW.Projects.Get(id);
                if (project == null)
                {
                    throw new ApplicationOperationException(string.Format("Project with id {0} not found", id), HttpStatusCode.NotFound);
                }
                UoW.Projects.Update(project, projectDto);
                UoW.Complete();
                return Mapper.Map<ProjectDTO>(project);
            }
        }

        public void Delete(int id)
        {
            using (UoW)
            {
                Project project = UoW.Projects.Get(id);
                if (project == null)
                {
                    throw new ApplicationOperationException(string.Format("Project with id {0} not found", id), HttpStatusCode.NotFound);
                }
                UoW.Projects.Remove(project);
                UoW.Complete();
            }
        }
    }
}