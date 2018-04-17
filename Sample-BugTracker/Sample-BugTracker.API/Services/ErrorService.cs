using AutoMapper;
using Sample_BugTracker.API.DTO;
using Sample_BugTracker.API.Exceptions;
using Sample_BugTracker.DAL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;

namespace Sample_BugTracker.API.Services
{
    public class ErrorService : BaseService
    {
        public IEnumerable<ErrorDTO> GetProjectErrors(int projectId)
        {
            using (UoW)
            {
                var project = UoW.Projects.Get(projectId);
                if (project == null)
                {
                    throw new ApplicationOperationException(string.Format("Project with id {0} not found", projectId), HttpStatusCode.NotFound);
                }
                return Mapper.Map<List<ErrorDTO>>(project.Errors);
            }
        }

        public ErrorDTO Add(ErrorDTO _error)
        {
            using (UoW)
            {
                Error error = Mapper.Map<Error>(_error);
                error.ErrorAuthor = CurrentUser;
                //var errorResponsible = UoW.Users.GetByEmail(_error.EmailErrorResponsible);
                //if (errorResponsible == null)
                //{
                //    throw new ApplicationOperationException(string.Format("Error responsible user with email {0} not found", _error.EmailErrorResponsible), HttpStatusCode.NotFound);
                //}
                //error.ErrorResponsible = errorResponsible;
                var project = UoW.Projects.Get(_error.ProjectId);
                if (project == null)
                {
                    throw new ApplicationOperationException(string.Format("Project with id {0} not found", _error.ProjectId), HttpStatusCode.NotFound);
                }
                error.Project = project;
                UoW.Errors.Add(error);
                UoW.Complete();
                return Mapper.Map<ErrorDTO>(error);
            }
        }
    }
}