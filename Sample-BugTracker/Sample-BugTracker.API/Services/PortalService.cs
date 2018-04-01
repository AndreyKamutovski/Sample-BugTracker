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
            using (var uow = CreateUnitOfWork())
            {
                AppUser userExists = uow.Users.GetByEmail(_portal.Owner.Email);
                if (userExists != null)
                {
                    throw new ApplicationOperationException(string.Format("User with email {0} already exists", _portal.Owner.Email), HttpStatusCode.Conflict);
                }

                if (uow.Portals.Find(prl => prl.Title == _portal.Title).Count<Portal>() > 0)
                {
                    throw new ApplicationOperationException(string.Format("Portal with name {0} already exists", _portal.Title), HttpStatusCode.Conflict);
                }

                AppUser user = Mapper.Map<AppUser>(_portal.Owner);
                uow.Users.Add(user, _portal.Owner.Password, "Admin");
                Portal portal = new Portal() { Id = user.Id, Title = _portal.Title };
                uow.Portals.Add(portal);
                uow.Complete();
            }
        }

        public bool CheckPortalTitleNotTaken(string title)
        {
            using (var uow = CreateUnitOfWork())
            {
                int count = uow.Portals.Find(prt => prt.Title == title).Count();
                return count > 0 ? false : true;
            }
        }
    }
}