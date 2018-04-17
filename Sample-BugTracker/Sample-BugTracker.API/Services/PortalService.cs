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
        public void Create(PortalDTO _portal)
        {
            using (UoW)
            {
                AppUser userExists = UoW.Users.GetByEmail(_portal.Owner.Email);
                if (userExists != null)
                {
                    throw new ApplicationOperationException(string.Format("User with email {0} already exists", _portal.Owner.Email), HttpStatusCode.Conflict);
                }

                if (UoW.Portals.Find(prl => prl.Title == _portal.Title).Count<Portal>() > 0)
                {
                    throw new ApplicationOperationException(string.Format("Portal with name {0} already exists", _portal.Title), HttpStatusCode.Conflict);
                }

                AppUser user = Mapper.Map<AppUser>(_portal.Owner);
                UoW.Users.Add(user, _portal.Owner.Password, _portal.Owner.RoleName);
                Portal portal = new Portal() { Id = user.Id, Title = _portal.Title };
                UoW.Portals.Add(portal);
                UoW.Complete();
            }
        }

        public bool CheckPortalTitleNotTaken(string title)
        {
            using (UoW)
            {
                int count = UoW.Portals.Find(prt => prt.Title == title).Count();
                return count > 0 ? false : true;
            }
        }

        public IEnumerable<PortalDTO> GetUserPortals()
        {
            using (UoW)
            {
                var portals = CurrentUser.UserProjects.Select(up => up.Project.Portal).ToList();
                if(CurrentUser.Portal != null)  // т.к. его могут прикрепить к проекту и он не имеет собственного портала
                {
                portals.Add(CurrentUser.Portal);

                }
                return Mapper.Map<List<PortalDTO>>(portals.Distinct());
            }
        }

        public bool IsPortalOwner(string portalId)
        {
            using (UoW)
            {
                var portal = UoW.Portals.Get(portalId);
                return portal.Owner.Id == CurrentUser.Id;
            }
        }
    }
}