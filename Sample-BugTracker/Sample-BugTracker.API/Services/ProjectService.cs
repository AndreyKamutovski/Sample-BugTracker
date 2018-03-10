using AutoMapper;
using Sample_BugTracker.API.DTO;
using Sample_BugTracker.DAL.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

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

        public void Add(ProjectDTO _project)
        {
            using(var uow = CreateUnitOfWork())
            {
                //Project project = new Project()
                //{
                //    Title = _project.Title,
                //    DateStart = _project.DateStart,
                //    DateEnd = _project.DateEnd,
                //    Description = _project.Description
                //};
                Project project = Mapper.Map<ProjectDTO, Project>(_project);
                uow.Projects.Add(project);
                uow.Complete();
            }
        }
    }
}