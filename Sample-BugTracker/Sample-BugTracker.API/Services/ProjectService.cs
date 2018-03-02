﻿using AutoMapper;
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
            using(var uow = CreateUnitOfWork())
            {
                Mapper.Initialize(config => config.CreateMap<Project, ProjectDTO>()); //вынести
                return Mapper.Map<IEnumerable<Project>, List<ProjectDTO>>(uow.Projects.GetAll());
            }
        }

        public void Add(ProjectDTO _project)
        {
            using(var uow = CreateUnitOfWork())
            {
                Project project = new Project()
                {
                    Title = _project.Title,
                    DateStart = _project.DateStart,
                    DateEnd = _project.DateEnd,
                    Description = _project.Description
                };

                uow.Projects.Add(project);
                uow.Complete();
            }
        }
    }
}