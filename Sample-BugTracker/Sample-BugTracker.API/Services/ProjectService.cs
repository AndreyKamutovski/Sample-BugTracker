using AutoMapper;
using Sample_BugTracker.API.DTO;
using Sample_BugTracker.API.DTO.Error;
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
                return Mapper.Map<List<ErrorDTO>>(project.Errors);
            }
        }

        public void Add(ProjectDTO _project)
        {
            using (UoW)
            {
                Project project = Mapper.Map<Project>(_project);
                project.Portal = CurrentUser.Portal;
                UoW.Projects.Add(project);
                var userProject = new UserProject() { Project = project, Worker = CurrentUser, Role = UoW.Roles.GetByName("Admin") };
                UoW.UserProjects.Add(userProject);
                UoW.Complete();
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

        public void Delete(int projectId)
        {
            if (projectId <= 0)
            {
                throw new ApplicationOperationException(string.Format("Not a valid project Id"), HttpStatusCode.NotFound);

            }
            using (UoW)
            {
                Project project = UoW.Projects.Get(projectId);
                if (project == null)
                {
                    throw new ApplicationOperationException(string.Format("Project with id {0} not found", projectId), HttpStatusCode.NotFound);
                }
                UoW.Projects.Remove(project);
                UoW.Complete();
            }

        }

        public string GetUserRoleForProject(int projectId)
        {
            using (UoW)
            {
                Project project = UoW.Projects.Get(projectId);
                if (project == null)
                {
                    throw new ApplicationOperationException(string.Format("Project with id {0} not found", projectId), HttpStatusCode.NotFound);
                }
                var projUser = UoW.UserProjects.Find(pu => pu.ProjectId == projectId && pu.WorkerId == CurrentUser.Id).FirstOrDefault();
                return projUser.Role.Name;
            }
        }
    }
}