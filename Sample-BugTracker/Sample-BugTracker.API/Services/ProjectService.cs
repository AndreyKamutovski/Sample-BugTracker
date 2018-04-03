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
            using (Uow)
            {
                //uow.Context.Entry(CurrentUser).Collection("Projects").Load
                //var domainProjects = uow.Users.GetByUserName(CurrentUser.UserName).Projects;
                return Mapper.Map<IEnumerable<Project>, List<ProjectDTO>>(CurrentUser.Projects);
            }
        }

        public ProjectDTO GetById(int id)
        {
            using (var uow = CreateUnitOfWork())
            {
                Project project = uow.Projects.Get(id);
                if (project == null)
                {
                    throw new ApplicationOperationException(string.Format("Project with id {0} not found", id), HttpStatusCode.NotFound);
                }
                return Mapper.Map<Project, ProjectDTO>(project);
            }
        }

        public ProjectDTO Add(ProjectDTO _project)  
        {
            using (Uow)
            {
                Project project = Mapper.Map<Project>(_project);
                // uow.Context.Users.At
                //uow.Context.Entry(CurrentUser).Reference("Portal").Load();
                //project.Portal = uow.Users.GetByUserName(CurrentUser.UserName).Portal;
                project.Portal = CurrentUser.Portal;
                Uow.Projects.Add(project);
                CurrentUser.Projects.Add(project);
                Uow.Context.Entry(CurrentUser).State = EntityState.Modified;
                Uow.Complete();
                return Mapper.Map<ProjectDTO>(project);
            }
        }
    }
}