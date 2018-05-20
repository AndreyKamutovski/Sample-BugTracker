using Sample_BugTracker.API.DTO;
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
    [RoutePrefix("api/solution")]
    public class SolutionController : ApiController
    {
        private SolutionService _solutionService = new SolutionService();

        [Route("{id:int:min(1)}")]
        public ErrorSolutionDTO Get([Required] int id)
        {
            return _solutionService.Get(id);
        }


        [Route("{id:int:min(1)}/attachment")]
        public List<AttachmentDTO> GetAttachments([Required] int id)
        {
            return _solutionService.GetAttachments(id);
        }

        [HttpPost]
        public ErrorSolutionDTO Add([Required] int errorId, ErrorSolutionDTO sln)
        {
            return _solutionService.Add(errorId, sln);
        }

        [HttpPost]
        [Route("{id:int:min(1)}/attachment")]
        public async Task<List<AttachmentDTO>> AddAttachments([Required] int id)
        {
            return await _solutionService.AddAttachments(id, Request);
        }

        [HttpPut]
        [Route("{id:int:min(1)}")]
        public ErrorSolutionDTO Update([Required] int id, ErrorSolutionDTO sln)
        {
            return _solutionService.Update(id, sln);
        }
    }
}
