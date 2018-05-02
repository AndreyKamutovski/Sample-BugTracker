using Sample_BugTracker.API.Services;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;

namespace Sample_BugTracker.API.Filters
{
    public class ProjectAuthorizationAttribute : AuthorizationFilterAttribute
    {
        private HttpActionContext _actionContext;

        public override void OnAuthorization(HttpActionContext actionContext)
        {
            _actionContext = actionContext;
            var currentUser = actionContext.RequestContext.Principal.Identity;
            if (currentUser.IsAuthenticated)
            {
                var queryString = actionContext.Request.RequestUri.Query;
                NameValueCollection parameters = System.Web.HttpUtility.ParseQueryString(queryString);
                var portalId = parameters["portalId"];
                if (portalId == null)
                {
                    ThrowResponseException(HttpStatusCode.NotFound, "ProjectAuthorizationAttribute: parameter portalId not found");
                }
                PortalService _portalService = new PortalService();
                if (!_portalService.IsPortalOwner(portalId))
                {
                    ThrowResponseException(HttpStatusCode.Unauthorized, "For removal, update and create portal projects, you must be the owner of the portal");
                }
                var actionName = actionContext.ActionDescriptor.ActionName;
                if (actionName == "Update" || actionName == "Delete")
                {
                    int projectId;
                    if (!int.TryParse(actionContext.ControllerContext.RouteData.Values["id"].ToString(), out projectId))
                    {
                        ThrowResponseException(HttpStatusCode.BadRequest, "ProjectAuthorizationAttribute: projectId is invalid");
                    }
                    ProjectService _projectService = new ProjectService();
                    if (_projectService.GetProjectOwner(projectId).Email != currentUser.Name)
                    {
                        ThrowResponseException(HttpStatusCode.Unauthorized, "For removal, update and create project, you must be the owner of the project");
                    }
                }
            }
            else
            {
                ThrowResponseException(HttpStatusCode.Unauthorized, "Authentication required");
            }
            base.OnAuthorization(actionContext);
        }

        private void ThrowResponseException(HttpStatusCode statusCode, string message)
        {
            throw new HttpResponseException(_actionContext.Request.CreateErrorResponse(statusCode, message));
        }
    }
}