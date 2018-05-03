using Marvin.JsonPatch;
using Sample_BugTracker.API.DTO;
using Sample_BugTracker.API.Services;
using Sample_BugTracker.DAL.Entities;
using Sample_BugTracker.DAL.Enumerations;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Net;
using System.Web.Http;

namespace Sample_BugTracker.API.Controllers
{
    [Authorize]
    [RoutePrefix("api/error")]
    public class ErrorController : ApiController
    {
        private ErrorService _errorService = new ErrorService();

        [HttpPost]
        [Route("{id:int:min(1)}")]
        public ErrorDTO GetById([Required] int id)
        {
            return _errorService.GetById(id);
        }

        [HttpPost]
        [Route("")]
        public ErrorDTO Add([Required] int projectId, [Required, FromBody] ErrorDTO errorDto)
        {
            return _errorService.Add(projectId, errorDto);
        }

        [HttpPost]
        [Route("")]
        public ErrorSolutionDTO AddSolution([Required] ErrorSolutionDTO solution)
        {
            _errorService.AddSolution(solution);
            return solution;
        }

        [HttpPut]
        [Route("{id:int:min(1)}")]
        public ErrorDTO Update([Required] int id, [Required, FromBody]ErrorDTO errorDto)
        {
            return _errorService.Update(id, errorDto);
        }

        [HttpPatch]
        [Route("{id:int:min(1)}/status")]
        public Status Status([Required] int id, [Required, FromBody]Status status)
        {
            return _errorService.UpdateStatus(id, status);
        }
    }
}
