using Sample_BugTracker.API.DTO.Error;
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
    [RoutePrefix("api/error/attachment")]
    public class ErrorAttachmentController : ApiController
    {
        private ErrorAttachmentService _errorAttachService = new ErrorAttachmentService();

        [Route("")]
        public List<AttachmentDTO> Get([Required] int errorId)
        {
            return _errorAttachService.Get(errorId);
        }

        [HttpPost]
        [Route("")]
        public async Task<List<AttachmentDTO>> Add([Required] int errorId)
        {
            return await _errorAttachService.Add(errorId, Request);
        }


        [Route("{id:int:min(1)}")]
        public void Delete([Required] int id)
        {
            _errorAttachService.Delete(id);
        }

        [HttpGet]
        [Route("{id:int:min(1)}/download")]
        public HttpResponseMessage Download([Required] int id)
        {
            return _errorAttachService.Download(id);
        }
    }
}
