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
        private StatisticsService _statisticsService = new StatisticsService();

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
                var portal = UoW.Portals.Get(portalId);
                if (portal == null)
                {
                    throw new ApplicationOperationException(string.Format("Portal with id {0} not found", portalId), HttpStatusCode.NotFound);
                }
                var projects = CurrentUser.UserProjects.Select(up => up.Project).Where(p => p.PortalId == portal.Id).ToList();
                var projectsDto = Mapper.Map<List<ProjectDTO>>(projects);
                foreach (var project in projectsDto)
                {
                    project.ErrorStatistics = _statisticsService.GetProjectErrorReport(project.Id);
                }
                return projectsDto;
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
                return _project;
            }
        }

        public ProjectDTO Edit(ProjectDTO _project)
        {
            using (UoW)
            {
                Project project = UoW.Projects.Get(_project.Id);
                if (project == null)
                {
                    throw new ApplicationOperationException(string.Format("Project with id {0} not found", _project.Id), HttpStatusCode.NotFound);
                }
                project.Title = _project.Title;
                project.DateStart = _project.DateStart;
                project.DateEnd = _project.DateEnd;
                project.Description = _project.Description;
                UoW.Complete();
                return _project;
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
    }
}