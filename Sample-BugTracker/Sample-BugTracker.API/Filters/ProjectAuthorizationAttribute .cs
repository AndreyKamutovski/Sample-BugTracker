using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;

namespace Sample_BugTracker.API.Filters
{
    public class ProjectAuthorizationAttribute : AuthorizationFilterAttribute
    {
        public override void OnAuthorization(HttpActionContext actionContext)
        {
            var queryString = actionContext.Request.RequestUri.Query;
            NameValueCollection parameters = System.Web.HttpUtility.ParseQueryString(queryString);
            var portalId = parameters["portalId"];
            if(portalId == null)
            {
                actionContext.Response = actionContext.Request.CreateResponse(HttpStatusCode.Unauthorized);
            }
        }
    }
}