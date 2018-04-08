using AutoMapper;
using Sample_BugTracker.API.DTO;
using Sample_BugTracker.API.Exceptions;
using Sample_BugTracker.DAL.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Net;
using System.Web;

namespace Sample_BugTracker.API.Services
{
    public class UserService : BaseService
    {
        public bool CheckEmailNotTaken(string email)
        {
            using (UoW)
            {
                AppUser user = UoW.Users.GetByEmail(email);
                return user == null ? true : false;
            }
        }

        public IEnumerable<UserDTO> GetProjectUsers(int projectId)
        {
            using (UoW)
            {
                Project project = UoW.Projects.Get(projectId);
                if (project == null)
                {
                    throw new ApplicationOperationException(string.Format("Project with id {0} not found", projectId), HttpStatusCode.NotFound);
                }
                return Mapper.Map<List<UserDTO>>(project.UserProjects);
            }
        }

        public IEnumerable<UserDTO> GetAll()
        {
            using (UoW)
            {
                return Mapper.Map<List<UserDTO>>(UoW.Users.GetAll());
            }
        }

        public UserDTO GetCurrentUser()
        {
            return Mapper.Map<UserDTO>(CurrentUser);
        }

        public IEnumerable<UserDTO> GetAttachableUsers(int projectId)
        {
            using (UoW)
            {
                Project project = UoW.Projects.Get(projectId);
                if (project == null)
                {
                    throw new ApplicationOperationException(string.Format("Project with id {0} not found", projectId), HttpStatusCode.NotFound);
                }
                var attachedUsers = project.UserProjects.Select(up => up.Worker).ToList();
                var attachableUsers = UoW.Users.GetAll().Except(attachedUsers);
                return Mapper.Map<List<UserDTO>>(attachableUsers);
            }
        }
    }
}