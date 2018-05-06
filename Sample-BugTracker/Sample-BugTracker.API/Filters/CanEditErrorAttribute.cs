using Sample_BugTracker.DAL.EF;
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
    public class CanEditErrorAttribute : AuthorizationFilterAttribute
    {
        private HttpActionContext _actionContext;

        public override void OnAuthorization(HttpActionContext actionContext)
        {
            _actionContext = actionContext;
            var currentUser = actionContext.RequestContext.Principal.Identity;
            if (currentUser.IsAuthenticated)
            {
                using (var UoW = new UnitOfWork(new ApplicationDbContext()))
                {
                    var appUser = UoW.Users.GetByEmail(currentUser.Name);
                    if (appUser == null)
                    {
                        ThrowResponseException(HttpStatusCode.NotFound, string.Format("CanEditErrorAttribute --> User with email {0} not found", currentUser.Name));
                    }
                    var errorId = actionContext.ControllerContext.RouteData.Values["id"].ToString();
                    if (errorId == null)
                    {
                        ThrowResponseException(HttpStatusCode.BadRequest, string.Format("CanEditErrorAttribute --> Can't get error id"));
                    }
                    var error = UoW.Errors.Get(int.Parse(errorId));
                    if (error == null)
                    {
                        ThrowResponseException(HttpStatusCode.NotFound, string.Format("CanEditErrorAttribute --> Error with id {0} not found", errorId));
                    }
                    var userProject = UoW.UserProjects.Find(up => up.ProjectId == error.ProjectId && up.WorkerId == appUser.Id).FirstOrDefault();
                    if (userProject == null)
                    {
                        ThrowResponseException(HttpStatusCode.NotFound, string.Format("CanEditErrorAttribute --> UserProject for project with id {0} and user email {1} not found", error.ProjectId, appUser.Email));
                    }
                    //if (userProject.Role.Permission.Any(p => p.Description == DAL.Enumerations.PermissionList.EDITING_ERROR))
                    //{
                        if (userProject.Role.Name == "User")
                        {
                            if (error.AuthorId != appUser.Id)
                            {
                                ThrowResponseException(HttpStatusCode.Unauthorized, string.Format("CanEditErrorAttribute --> User with email {0} can't edit error with id {1}", appUser.Email, errorId));
                            }
                        }
                    //}
                    //else
                    //{
                    //    ThrowResponseException(HttpStatusCode.Unauthorized, string.Format("CanEditErrorAttribute --> Editing error with id {0} for user with email {1} unauthorized", errorId, appUser.Email));
                    //}
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