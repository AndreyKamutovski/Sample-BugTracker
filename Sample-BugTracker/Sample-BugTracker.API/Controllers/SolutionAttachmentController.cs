using Sample_BugTracker.API.DTO.Error;
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
    [Authorize]
    [RoutePrefix("api/solution/attachment")]
    public class SolutionAttachmentController : ApiController
    {
        private SolutionAttachmentService _slnAttachmentService = new SolutionAttachmentService();

        [Route("{id:int:min(1)}")]
        public void Delete([Required] int id)
        {
            _slnAttachmentService.Delete(id);
        }

        [HttpGet]
        [Route("{id:int:min(1)}/download")]
        public HttpResponseMessage Download([Required] int id)
        {
            return _slnAttachmentService.Download(id);
        }
    }
}
