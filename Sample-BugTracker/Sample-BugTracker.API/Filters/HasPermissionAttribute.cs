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

        public HasPermissionAttribute(params PermissionList[] permission)
        {
            this._permission = permission;
        }

        public override void OnActionExecuting(HttpActionContext actionContext)
        {
            var currentUser = actionContext.RequestContext.Principal.Identity;
            var actionName = actionContext.ActionDescriptor.ActionName;
            if (currentUser.IsAuthenticated)
            {
                var queryString = actionContext.Request.RequestUri.Query;
                var parameters = System.Web.HttpUtility.ParseQueryString(queryString);
                var errorId = actionContext.ActionArguments["id"];
                if (errorId == null)
                {
                    throw new HttpResponseException(actionContext.Request.CreateErrorResponse(HttpStatusCode.NotFound, "HasPermissionAttribute: parameter id not found"));
                }

                using (var UoW = new UnitOfWork(new ApplicationDbContext()))
                {
                    var error = UoW.Errors.Get(errorId);
                    if(error == null)
                    {
                        throw new HttpResponseException(actionContext.Request.CreateErrorResponse(HttpStatusCode.NotFound, string.Format("Error with id {0} not found", errorId)));
                    }
                    var userProject = UoW.UserProjects.Find(up => up.ProjectId == error.ProjectId && up.Worker.Email == currentUser.Name).FirstOrDefault();
                    if(userProject == null)
                    {
                        throw new HttpResponseException(actionContext.Request.CreateErrorResponse(HttpStatusCode.NotFound, string.Format("UserProject for project with id {0} and worker email {1} not found", error.ProjectId, currentUser.Name)));
                    }
                    var isAuthorized = false;
                    List<PermissionList> rolePermission = userProject.Role.Permission.Select(p => p.Description).ToList();
                    foreach (var perm in _permission) {
                        isAuthorized = rolePermission.Contains(perm);
                    }
                    if(!isAuthorized)
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