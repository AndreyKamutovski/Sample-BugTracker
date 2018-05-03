using Sample_BugTracker.DAL.Enumerations;
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
    public class HasPermissionAttribute: ActionFilterAttribute
    {
        private PermissionList[] _permission;

        public HasPermissionAttribute(params PermissionList[] permission)
        {
            this._permission = permission;
        }

        public override void OnActionExecuting(HttpActionContext actionContext)
        {
            var currentUser = actionContext.RequestContext.Principal.Identity;
            if (currentUser.IsAuthenticated)
            {
                var queryString = actionContext.Request.RequestUri.Query;
                var parameters = System.Web.HttpUtility.ParseQueryString(queryString);
                var errorId = parameters["id"];
                if (errorId == null)
                {
                    throw new HttpResponseException(actionContext.Request.CreateErrorResponse(HttpStatusCode.NotFound, "HasPermissionAttribute: parameter id not found"));
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