using AutoMapper;
using Sample_BugTracker.API.DTO;
using Sample_BugTracker.DAL.Entities;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System;

namespace Sample_BugTracker.API.Services
{
    public class ProjectService: BaseService
    {
        public IEnumerable<ProjectDTO> GetAll()
        {
            using(UnitOfWork)
            {
                Mapper.Initialize(config => config.CreateMap<Project, ProjectDTO>());
                return Mapper.Map<IEnumerable<Project>, List<ProjectDTO>>(UnitOfWork.Projects.GetAll());
            }
        }

        public void Add([Required]ProjectDTO _project)
        {
            using(UnitOfWork)
            {
                Project project = new Project()
                {
                    Id = Guid.NewGuid(),
                    Title = _project.Title,
                    DateStart = _project.DateStart,
                    DateEnd = _project.DateEnd,
                    Description = _project.Description
                };

                UnitOfWork.Projects.Add(project);
                UnitOfWork.Complete();
            }
        }
    }
}