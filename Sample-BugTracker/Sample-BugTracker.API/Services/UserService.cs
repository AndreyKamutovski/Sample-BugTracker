using AutoMapper;
using Sample_BugTracker.API.DTO;
using Sample_BugTracker.API.Exceptions;
using Sample_BugTracker.API.Providers;
using Sample_BugTracker.DAL.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

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

        public UserDTO GetProjectOwner(int projectId)
        {
            using (UoW)
            {
                AppUser owner = UoW.Projects.Get(projectId).Portal.Owner;
                return Mapper.Map<UserDTO>(owner);
            }
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

        public async Task<string> UploadUserAvatar(HttpRequestMessage request)
        {
            // Check if the request contains multipart/form-data.
            if (!request.Content.IsMimeMultipartContent())
            {
                throw new ApplicationOperationException("", HttpStatusCode.UnsupportedMediaType);
            }

            try
            {
                if (CurrentUser.Avatar != null)
                {
                    string deletedAvatarPath = HttpContext.Current.Server.MapPath(string.Format("~/{0}", CurrentUser.Avatar));
                    if (System.IO.File.Exists(deletedAvatarPath))
                    {
                        // Use a try block to catch IOExceptions, to
                        // handle the case of the file already being
                        // opened by another process.
                        System.IO.File.Delete(deletedAvatarPath);
                    }
                }
                string rootAvatarFolder = HttpContext.Current.Server.MapPath("~/Avatars");
                var provider = new AvatarStreamProvider(rootAvatarFolder);

                // Read the form data.
                await request.Content.ReadAsMultipartAsync(provider);
                string returningPath = string.Empty;
                using (UoW)
                {
                    var file = provider.FileData.FirstOrDefault();
                    if (file != null)
                    {
                        AppUser user = UoW.Users.GetByEmail(CurrentUser.Email);
                        var fileName = file.LocalFileName.Substring(file.LocalFileName.LastIndexOf('\\') + 1);
                        user.Avatar = returningPath = string.Concat("Avatars/", fileName);
                        UoW.Complete();
                    }
                    else
                    {
                        throw new ApplicationOperationException("For an avatar you need one image", HttpStatusCode.BadRequest);
                    }
                }
                return returningPath;
            }
            catch (System.Exception e)
            {
                throw new ApplicationOperationException(e.Message, HttpStatusCode.InternalServerError);
            }
        }
    }
}