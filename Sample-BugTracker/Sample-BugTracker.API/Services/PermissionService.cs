using Sample_BugTracker.API.Exceptions;
using Sample_BugTracker.DAL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;

namespace Sample_BugTracker.API.Services
{
    public class PermissionService : BaseService
    {

        public bool CanChangeAssignee(int projectId)
        {
            using (UoW)
            {
                var role = GetUserProject(projectId).Role;
                return (role.Name == "Admin" || role.Name == "Moderator") ? true : false;
            }
        }

        private UserProject GetUserProject(int projectId)
        {
            var userProject = UoW.UserProjects.Find(up => up.ProjectId == projectId && up.WorkerId == CurrentUser.Id).FirstOrDefault();
            if (userProject == null)
            {
                throw new ApplicationOperationException(string.Format("User with email {0} not attach to project with id {1}", CurrentUser.Email, projectId), HttpStatusCode.NotFound);
            }
            return userProject;
        }
    }
}