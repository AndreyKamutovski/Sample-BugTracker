using AutoMapper;
using Sample_BugTracker.API.Services;
using Sample_BugTracker.DAL.EF;
using Sample_BugTracker.DAL.Entities;
using Sample_BugTracker.DAL.Enumerations;
using Sample_BugTracker.DAL.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;

namespace Sample_BugTracker.API.Filters
{
    public class HasPermissionAttribute : ActionFilterAttribute
    {
        private PermissionList[] _permission;
        private int? _projId;
        private string _errorIdParamName;
        private string _projectIdParamName;


        public HasPermissionAttribute(string errorIdParamName = "id", string projectIdParamName = "projectId", params PermissionList[] permission)
        {
            this._permission = permission;
            this._errorIdParamName = errorIdParamName;
            this._projectIdParamName = projectIdParamName;
        }

        public override void OnActionExecuting(HttpActionContext actionContext)
        {
            var currentUser = actionContext.RequestContext.Principal.Identity;
            var actionName = actionContext.ActionDescriptor.ActionName;
            if (currentUser.IsAuthenticated)
            {
                using (var UoW = new UnitOfWork(new ApplicationDbContext()))
                {
                    UserProject userProject = null;
                    if (actionContext.ActionArguments.ContainsKey((_errorIdParamName))) // for errorId
                    {
                        var errorId = actionContext.ActionArguments[_errorIdParamName];
                        var error = UoW.Errors.Get(errorId);
                        if (error == null)
                        {
                            throw new HttpResponseException(actionContext.Request.CreateErrorResponse(HttpStatusCode.NotFound, string.Format("Error with id {0} not found", errorId)));
                        }
                        _projId = error.ProjectId;
                        userProject = UoW.UserProjects.Find(up => up.ProjectId == error.ProjectId && up.Worker.Email == currentUser.Name).FirstOrDefault();
                    }

                    if (actionContext.ActionArguments.ContainsKey((_projectIdParamName)))
                    {
                        var projId = actionContext.ActionArguments[_projectIdParamName];
                        var project = UoW.Projects.Get(projId);
                        if (project == null)
                        {
                            throw new HttpResponseException(actionContext.Request.CreateErrorResponse(HttpStatusCode.NotFound, string.Format("Project with id {0} not found", projId)));
                        }
                        _projId = project.Id;
                        userProject = UoW.UserProjects.Find(up => up.ProjectId == project.Id && up.Worker.Email == currentUser.Name).FirstOrDefault();
                    }

                    if (userProject == null)
                    {
                        throw new HttpResponseException(actionContext.Request.CreateErrorResponse(HttpStatusCode.NotFound, string.Format("UserProject for project with id {0} and user email {1} not found", _projId, currentUser.Name)));
                    }
                    var isAuthorized = false;
                    List<PermissionList> rolePermission = userProject.Role.Permission.Select(p => p.Description).ToList();
                    foreach (var perm in _permission)
                    {
                        isAuthorized = rolePermission.Contains(perm);
                    }
                    if (!isAuthorized)
                    {
                        throw new HttpResponseException(actionContext.Request.CreateErrorResponse(HttpStatusCode.Unauthorized, string.Format("Unauthorized: for execute action {0} insufficient permissions ", actionName)));
                    }
                }
            }
            else
            {
                throw new HttpResponseException(actionContext.Request.CreateErrorResponse(HttpStatusCode.Unauthorized, "Authentication required"));
            }
            base.OnActionExecuting(actionContext);
        }
    }
}