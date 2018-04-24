using AutoMapper;
using Sample_BugTracker.API.DTO;
using Sample_BugTracker.API.Exceptions;
using Sample_BugTracker.DAL.Entities;
using Sample_BugTracker.DAL.Enumerations;
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

        public void AddSolution(ErrorSolutionDTO _solution)
        {
            using (UoW)
            {
                var error = UoW.Errors.Get(_solution.ErrorId);
                if (error == null)
                {
                    throw new ApplicationOperationException(string.Format("Error with id {0} not found", _solution.ErrorId), HttpStatusCode.NotFound);
                }
                var solution = new ErrorSolution();
                solution.Author = CurrentUser;
                solution.Error = error;
                solution.Description = _solution.Description;
                solution.DateSolution = _solution.DateSolution;
                UoW.Solutions.Add(solution);
                UoW.Complete();
            }
        }


        public UpdateErrorResponsibleDTO UpdateErrorResponsible(UpdateErrorResponsibleDTO _error)
        {
            using (UoW)
            {
                var error = UoW.Errors.Get(_error.ErrorId);
                if (error == null)
                {
                    throw new ApplicationOperationException(string.Format("Error with id {0} not found", _error.ErrorId), HttpStatusCode.NotFound);
                }
                if (_error.EmailErrorResponsible != string.Empty)
                {
                    var errorResponsible = UoW.Users.GetByEmail(_error.EmailErrorResponsible);
                    if (errorResponsible == null)
                    {
                        throw new ApplicationOperationException(string.Format("User with email {0} not found", _error.EmailErrorResponsible), HttpStatusCode.NotFound);
                    }
                    error.ErrorResponsible = errorResponsible;

                }
                else
                {
                    error.ErrorResponsible = null;  // не назначен
                    error.ErrorResponsibleId = null;
                }
                UoW.Complete();
                return _error;
            }

        }

        public UpdateErrorDeadlineDTO UpdateErrorDeadline(UpdateErrorDeadlineDTO _error)
        {
            using (UoW)
            {
                var error = UoW.Errors.Get(_error.ErrorId);
                if (error == null)
                {
                    throw new ApplicationOperationException(string.Format("Error with id {0} not found", _error.ErrorId), HttpStatusCode.NotFound);
                }
                error.Deadline = _error.Deadline;
                UoW.Complete();
                return _error;
            }
        }

        public UpdateErrorSPCEnumsDTO<Status> UpdateErrorStatus(UpdateErrorSPCEnumsDTO<Status> _error)
        {
            using (UoW)
            {
                var error = UoW.Errors.Get(_error.ErrorId);
                if (error == null)
                {
                    throw new ApplicationOperationException(string.Format("Error with id {0} not found", _error.ErrorId), HttpStatusCode.NotFound);
                }
                error.Status = _error.spc;
                UoW.Complete();
                return _error;
            }
        }

        public UpdateErrorSPCEnumsDTO<Priority> UpdateErrorPriority(UpdateErrorSPCEnumsDTO<Priority> _error)
        {
            using (UoW)
            {
                var error = UoW.Errors.Get(_error.ErrorId);
                if (error == null)
                {
                    throw new ApplicationOperationException(string.Format("Error with id {0} not found", _error.ErrorId), HttpStatusCode.NotFound);
                }
                error.Priority = _error.spc;
                UoW.Complete();
                return _error;
            }
        }

        public UpdateErrorSPCEnumsDTO<Classification> UpdateErrorClassification(UpdateErrorSPCEnumsDTO<Classification> _error)
        {
            using (UoW)
            {
                var error = UoW.Errors.Get(_error.ErrorId);
                if (error == null)
                {
                    throw new ApplicationOperationException(string.Format("Error with id {0} not found", _error.ErrorId), HttpStatusCode.NotFound);
                }
                error.Classification = _error.spc;
                UoW.Complete();
                return _error;
            }
        }

        public ErrorDTO UpdateError(ErrorDTO _error)
        {
            using (UoW)
            {
                var error = UoW.Errors.Get(_error.Id);
                if (error == null)
                {
                    throw new ApplicationOperationException(string.Format("Error with id {0} not found", _error.Id), HttpStatusCode.NotFound);
                }
                if (_error.EmailErrorResponsible != null)
                {
                    var errorResponsible = UoW.Users.GetByEmail(_error.EmailErrorResponsible);
                    if (errorResponsible == null)
                    {
                        throw new ApplicationOperationException(string.Format("User with email {0} not found", _error.EmailErrorResponsible), HttpStatusCode.NotFound);
                    }
                    error.ErrorResponsible = errorResponsible;
                }
                else
                {
                    error.ErrorResponsible = null;  // не назначен
                    error.ErrorResponsibleId = null;
                }
                error.Title = _error.Title;
                error.Description = _error.Description;
                error.Deadline = _error.Deadline;
                error.Status = _error.Status;
                error.Priority = _error.Priority;
                error.Classification = _error.Classification;
                UoW.Complete();
                return Mapper.Map<ErrorDTO>(error);
            }
        }
    }
}