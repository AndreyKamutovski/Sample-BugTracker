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
        public async Task Create(PortalDTO _portal)
        {
            using (var uow = CreateUnitOfWork())
            {
                AppUser userExists = await uow.Users.GetByEmail(_portal.Owner.Email);
                if (userExists != null)
                {
                    throw new ApplicationOperationException(string.Format("User with email {0} already exists", _portal.Owner.Email), HttpStatusCode.Conflict);
                }

                if (uow.Portals.Find(portal => portal.Title == _portal.Title).Count<Portal>() > 0)
                {
                    throw new ApplicationOperationException(string.Format("Portal with name {0} already exists", _portal.Title), HttpStatusCode.Conflict);
                }

                uow.Portals.Add(Mapper.Map<Portal>(_portal));
                uow.Complete();
            }
        }
    }
}