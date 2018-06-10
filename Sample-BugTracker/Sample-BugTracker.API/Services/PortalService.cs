using AutoMapper;
using Sample_BugTracker.API.DTO;
using Sample_BugTracker.API.Exceptions;
using Sample_BugTracker.DAL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web;

namespace Sample_BugTracker.API.Services
{
    public class PortalService : BaseService
    {
        private StatisticsService _statisticsService = new StatisticsService();

        public IEnumerable<ProjectDTO> GetPortalProjects(string id)
        {
            using (UoW)
            {
                var portal = UoW.Portals.Get(id);
                if (portal == null)
                {
                    throw new ApplicationOperationException(string.Format("Portal with id {0} not found", id), HttpStatusCode.NotFound);
                }
                var projects = CurrentUser.UserProjects.Where(up => up.Project.PortalId == portal.Id).Select(p => p.Project).ToList();
                var projectsDto = Mapper.Map<List<ProjectDTO>>(projects);
                foreach (var project in projectsDto)
                {
                    project.ErrorStatistics = _statisticsService.GetProjectErrorReport(project.ProjectId);
                }
                return projectsDto;
            }
        }

        public PortalDTO Create(PortalDTO portalDto)
        {
            using (UoW)
            {
                AppUser userExists = UoW.Users.GetByEmail(portalDto.Owner.Email);
                if (userExists != null)
                {
                    throw new ApplicationOperationException(string.Format("User with email {0} already exists", portalDto.Owner.Email), HttpStatusCode.Conflict);
                }

                if (UoW.Portals.Find(prl => prl.Title == portalDto.Title).Count<Portal>() > 0)
                {
                    throw new ApplicationOperationException(string.Format("Portal with name {0} already exists", portalDto.Title), HttpStatusCode.Conflict);
                }

                //AppUser user = Mapper.Map<AppUser>(portalDto.Owner);
                var user = new AppUser() { Email = portalDto.Owner.Email, UserName = portalDto.Owner.Email };

                UoW.Users.Add(user, portalDto.Owner.Password, portalDto.Owner.RoleName);
                Portal portal = new Portal() { Id = user.Id, Title = portalDto.Title };
                UoW.Portals.Add(portal);
                UoW.Complete();
                return Mapper.Map<PortalDTO>(portal);
            }
        }

        public bool IsPortalTitleAvailable(string title)
        {
            using (UoW)
            {
                return UoW.Portals.IsPortalTitleAvailable(title);
            }
        }

        public bool IsPortalOwner(string id)
        {
            using (UoW)
            {
                var portal = UoW.Portals.Get(id);
                if(portal == null)
                {
                    throw new ApplicationOperationException(string.Format("Portal with id {0} not found", id), HttpStatusCode.NotFound);
                }
                return portal.Owner.Id == CurrentUser.Id;
            }
        }


        public PortalDTO CreatePortalForExistingUser(string title)
        {
            using (UoW)
            {
                if (CurrentUser.Portal != null)
                {
                    throw new ApplicationOperationException(string.Format("For user with email {0} portal already exists", CurrentUser.Email), HttpStatusCode.Conflict);
                }
                Portal portal = new Portal() { Id = CurrentUser.Id, Title = title };
                UoW.Portals.Add(portal);
                UoW.Complete();
                return Mapper.Map<PortalDTO>(portal);
            }
        }
    }
}