using AutoMapper;
using Sample_BugTracker.API.DTO;
using Sample_BugTracker.API.Exceptions;
using Sample_BugTracker.DAL.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Net;
using System.Security.Claims;

namespace Sample_BugTracker.API.Services
{

    public class ProjectService : BaseService
    {
        public IEnumerable<ProjectDTO> GetAll()
        {
            using (var uow = CreateUnitOfWork())
            {
                var domainProjects = uow.Projects.Find(project => project.Workers.Contains(CurrentUser));
                return Mapper.Map<IEnumerable<Project>, List<ProjectDTO>>(domainProjects);
            }
        }

        public ProjectDTO Add(ProjectDTO _project)
        {
            using (var uow = CreateUnitOfWork())
            {
                Project project = Mapper.Map<ProjectDTO, Project>(_project);
                project.Workers.Add(CurrentUser);
                uow.Projects.Add(project);
                uow.Complete();
            }
            return _project;
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
    }
}