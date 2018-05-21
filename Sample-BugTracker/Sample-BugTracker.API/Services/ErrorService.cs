using AutoMapper;
using Marvin.JsonPatch;
using Sample_BugTracker.API.DTO;
using Sample_BugTracker.API.DTO.Error;
using Sample_BugTracker.API.DTO.Error.PartialUpdate;
using Sample_BugTracker.API.Exceptions;
using Sample_BugTracker.API.Providers;
using Sample_BugTracker.DAL.Entities;
using Sample_BugTracker.DAL.Enumerations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;

namespace Sample_BugTracker.API.Services
{
    public class ErrorService : BaseService
    {
        public ErrorDTO GetById(int id)
        {
            using (UoW)
            {
                var error = UoW.Errors.Get(id);
                if (error == null)
                {
                    throw new ApplicationOperationException(string.Format("Error with id {0} not found", id), HttpStatusCode.NotFound);
                }
                return Mapper.Map<ErrorDTO>(error);
            }
        }

        public ErrorDTO Add(int projectId, ErrorDTO errorDto)
        {
            using (UoW)
            {
                var error = Mapper.Map<Error>(errorDto);
                var project = UoW.Projects.Get(projectId);
                if (project == null)
                {
                    throw new ApplicationOperationException(string.Format("Project with id {0} not found", projectId), HttpStatusCode.NotFound);
                }
                if (errorDto.EmailAssignee != null)
                {
                    var assignee = UoW.Users.GetByEmail(errorDto.EmailAssignee);
                    if (assignee == null)
                    {
                        throw new ApplicationOperationException(string.Format("Error assignee with email {0} not found", errorDto.EmailAssignee), HttpStatusCode.NotFound);
                    }
                    error.Assignee = assignee;
                }
                else error.Assignee = null;
                error.Project = project;
                error.Author = CurrentUser;
                UoW.Errors.Add(error);
                UoW.Complete();
                return Mapper.Map<ErrorDTO>(error);
            }
        }

        public void AddSolution(ErrorSolutionDTO _solution)
        {
            //using (UoW)
            //{
            //    var error = UoW.Errors.Get(_solution.ErrorId);
            //    if (error == null)
            //    {
            //        throw new ApplicationOperationException(string.Format("Error with id {0} not found", _solution.ErrorId), HttpStatusCode.NotFound);
            //    }
            //    var solution = new ErrorSolution();
            //    solution.Author = CurrentUser;
            //    solution.Error = error;
            //    solution.Description = _solution.Description;
            //    solution.DateSolution = _solution.DateSolution;
            //    UoW.Solutions.Add(solution);
            //    UoW.Complete();
            //}
        }

        public ErrorDTO Update(int id, ErrorDTO errorDto)
        {
            using (UoW)
            {
                var error = UoW.Errors.Get(id);
                if (error == null)
                {
                    throw new ApplicationOperationException(string.Format("Error with id {0} not found", id), HttpStatusCode.NotFound);
                }
                UoW.Errors.Update(error, errorDto);

                if (errorDto.EmailAuthor != null)
                {
                    var newAuthor = UoW.Users.GetByEmail(errorDto.EmailAuthor);
                    if (newAuthor == null)
                    {
                        throw new ApplicationOperationException(string.Format("Error author with email {0} not found", errorDto.EmailAuthor), HttpStatusCode.NotFound);
                    }
                    error.Author = newAuthor;
                }

                if (errorDto.EmailAssignee != null)
                {
                    var newAssignee = UoW.Users.GetByEmail(errorDto.EmailAssignee);
                    if (newAssignee == null)
                    {
                        throw new ApplicationOperationException(string.Format("Error assignee with email {0} not found", errorDto.EmailAssignee), HttpStatusCode.NotFound);
                    }
                    error.Assignee = newAssignee;
                }
                if (errorDto.EmailAssignee == null)
                {
                    error.AssigneeId = null;
                    error.Assignee = null;
                }
                UoW.Complete();
                return Mapper.Map<ErrorDTO>(error);
            }
        }

        public Status UpdateStatus(int id, Status status)
        {
            using (UoW)
            {
                var error = UoW.Errors.Get(id);
                if (error == null)
                {
                    throw new ApplicationOperationException(string.Format("Error with id {0} not found", id), HttpStatusCode.NotFound);
                }
                if (error.Status != status)
                {
                    error.Status = status;
                }
                UoW.Complete();
                return error.Status;
            }
        }

        public AssigneeUpdateDTO UpdateAssignee(int id, AssigneeUpdateDTO assignee)
        {
            using (UoW)
            {
                var error = UoW.Errors.Get(id);
                if (error == null)
                {
                    throw new ApplicationOperationException(string.Format("Error with id {0} not found", id), HttpStatusCode.NotFound);
                }
                if (assignee.EmailAssignee != null)
                {
                    var newAssignee = UoW.Users.GetByEmail(assignee.EmailAssignee);
                    if (newAssignee == null)
                    {
                        throw new ApplicationOperationException(string.Format("Error assignee with email {0} not found", assignee.EmailAssignee), HttpStatusCode.NotFound);
                    }
                    error.Assignee = newAssignee;
                }
                if (assignee.EmailAssignee == null)
                {
                    error.AssigneeId = null;
                    error.Assignee = null;
                }
                UoW.Complete();
                return assignee;
            }
        }

        public DeadlineUpdateDTO UpdateDeadline(int id, DeadlineUpdateDTO deadline)
        {
            using (UoW)
            {
                var error = UoW.Errors.Get(id);
                if (error == null)
                {
                    throw new ApplicationOperationException(string.Format("Error with id {0} not found", id), HttpStatusCode.NotFound);
                }
                if (error.Deadline != deadline.Deadline)
                {
                    error.Deadline = deadline.Deadline;
                    UoW.Complete();
                }
                return deadline;
            }
        }

        public Priority UpdatePriority(int id, Priority priority)
        {
            using (UoW)
            {
                var error = UoW.Errors.Get(id);
                if (error == null)
                {
                    throw new ApplicationOperationException(string.Format("Error with id {0} not found", id), HttpStatusCode.NotFound);
                }
                if (error.Priority != priority)
                {
                    error.Priority = priority;
                    UoW.Complete();
                }
                return error.Priority;
            }
        }

        public Classification UpdateClassification(int id, Classification classification)
        {
            using (UoW)
            {
                var error = UoW.Errors.Get(id);
                if (error == null)
                {
                    throw new ApplicationOperationException(string.Format("Error with id {0} not found", id), HttpStatusCode.NotFound);
                }
                if (error.Classification != classification)
                {
                    error.Classification = classification;
                    UoW.Complete();
                }
                return error.Classification;
            }
        }

        public string UpdateTitle(int id, TitleUpdateDTO title)
        {
            var error = UoW.Errors.Get(id);
            if (error == null)
            {
                throw new ApplicationOperationException(string.Format("Error with id {0} not found", id), HttpStatusCode.NotFound);
            }
            if (error.Title != title.Title)
            {
                error.Title = title.Title;
                UoW.Complete();
            }
            return title.Title;
        }

        public string UpdateDescription(int id, DescriptionUpdateDTO description)
        {
            var error = UoW.Errors.Get(id);
            if (error == null)
            {
                throw new ApplicationOperationException(string.Format("Error with id {0} not found", id), HttpStatusCode.NotFound);
            }
            if (error.Description != description.Description)
            {
                error.Description = description.Description;
                UoW.Complete();
            }
            return description.Description;
        }

    }
}