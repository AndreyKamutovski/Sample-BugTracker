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
    [AllowAnonymous]
    public class PortalController : ApiController
    {
        private PortalService _portalService = new PortalService();

        [HttpPost]
        public void Create([Required] PortalDTO portal)
        {
             _portalService.Create(portal);
        }

        [HttpGet]
        public bool CheckPortalTitleNotTaken([Required] string title)
        {
            return _portalService.CheckPortalTitleNotTaken(title);
        }

        [Authorize]
        public IEnumerable<PortalDTO> GetUserPortals()
        {
            return _portalService.GetUserPortals();
        }
    }
}
