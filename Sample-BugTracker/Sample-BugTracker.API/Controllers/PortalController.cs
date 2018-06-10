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
    [Authorize]
    [RoutePrefix("api/portal")]
    public class PortalController : ApiController
    {
        private PortalService _portalService = new PortalService();

        [Route("{id}/projects")]
        public IEnumerable<ProjectDTO> GetPortalProjects([Required] string id)
        {
            return _portalService.GetPortalProjects(id);
        }

        [HttpGet]
        [Route("")]
        [AllowAnonymous]
        public bool IsPortalTitleAvailable([Required] string title)
        {
            return _portalService.IsPortalTitleAvailable(title);
        }

        [HttpGet]
        [Route("")]
        public bool IsPortalOwner([Required] string id)
        {
            return _portalService.IsPortalOwner(id);
        }

        [HttpPost]
        [Route("")]
        [AllowAnonymous]
        public PortalDTO Create([Required] PortalDTO portalDto)
        {
             return _portalService.Create(portalDto);
        }

        [HttpPost]
        [Route("createForExistingUser")]
        public PortalDTO CreatePortalForExistingUser([Required] string title)
        {
            return _portalService.CreatePortalForExistingUser(title);
        }
    }
}
