using AutoMapper;
using Sample_BugTracker.API.DTO;
using Sample_BugTracker.API.Exceptions;
using Sample_BugTracker.DAL.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Net;

namespace Sample_BugTracker.API.Services
{

    public class ProjectService: BaseService
    {
        public IEnumerable<ProjectDTO> GetAll()
        {
            using(var uow = CreateUnitOfWork())
            {
                return Mapper.Map<IEnumerable<Project>, List<ProjectDTO>>(uow.Projects.GetAll());
            }
        }

        public ProjectDTO Add(ProjectDTO _project, string userName)
        {
            using(var uow = CreateUnitOfWork())
            {
                Project project = Mapper.Map<ProjectDTO, Project>(_project);
                AppUser user = uow.Users.GetByUserName(userName);
                project.Workers.Add(user);
                uow.Projects.Add(project);
                uow.Complete();
            }
            return _project;
        }

        public ProjectDTO GetById(int id)
        {
            using(var uow = CreateUnitOfWork())
            {
                Project project = uow.Projects.Get(id);
                if(project == null)
                {
                    throw new ApplicationOperationException(string.Format("Project with id {0} not found", id), HttpStatusCode.NotFound);
                }
                return Mapper.Map<Project, ProjectDTO>(project);
            }
        }
    }
}