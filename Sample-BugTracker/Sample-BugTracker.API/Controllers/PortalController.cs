﻿using Sample_BugTracker.API.DTO;
using Sample_BugTracker.API.Services;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Sample_BugTracker.API.Controllers
{
    public class PortalController : ApiController
    {
        private PortalService _portalService = new PortalService();

        [AllowAnonymous]
        [HttpPost]
        public void Add([Required] PortalDTO portal)
        {
            _portalService.Add(portal);
        }
    }
}
