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

        [HttpPost]
        public ErrorSolutionDTO Add([Required] int errorId, ErrorSolutionDTO sln)
        {
            return _solutionService.Add(errorId, sln);
        }

        [HttpPut]
        [Route("{id:int:min(1)}")]
        public ErrorSolutionDTO Update([Required] int id, ErrorSolutionDTO sln)
        {
            return _solutionService.Update(id, sln);
        }
    }
}
