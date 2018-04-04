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
                return Mapper.Map<IEnumerable<Project>, List<ProjectDTO>>(CurrentUser.UserProjects.Select(up => up.Project));
            }
        }

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
    }
}