using Sample_BugTracker.API.DTO;
using Sample_BugTracker.API.Services;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace Sample_BugTracker.API.Controllers
{
    public class PortalController : ApiController
    {
        private PortalService _portalService = new PortalService();

        [HttpPost]
        [AllowAnonymous]
        public void Create([Required] PortalDTO portal)
        {
             _portalService.Create(portal);
        }

        [HttpGet]
        [AllowAnonymous]
        public bool CheckPortalTitleNotTaken([Required] string title)
        {
            return _portalService.CheckPortalTitleNotTaken(title);
        }
    }
}
