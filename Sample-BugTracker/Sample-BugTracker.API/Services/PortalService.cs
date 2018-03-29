using AutoMapper;
using Sample_BugTracker.API.DTO;
using Sample_BugTracker.DAL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace Sample_BugTracker.API.Services
{
    public class PortalService: BaseService
    {
        private AccountService _accountService = new AccountService();

        public void Add(PortalDTO _portal)
        {
            using (var uow = CreateUnitOfWork())
            {
                //await _accountService.Register(_owner);
                //AppUser owner = await uow.Users.Get(_owner.Email, _owner.Password);
                var portal = Mapper.Map<Portal>(_portal);
                uow.Portals.Add(portal);
                uow.Complete();
            }
        }
    }
}