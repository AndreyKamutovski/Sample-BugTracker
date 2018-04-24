using Sample_BugTracker.API.DTO;
using Sample_BugTracker.API.Services;
using Sample_BugTracker.DAL.Enumerations;
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
    public class ErrorController : ApiController
    {
        private ErrorService _errorService = new ErrorService();

        public IEnumerable<ErrorDTO> GetProjectErrors([Required] int projectId)
        {
            return _errorService.GetProjectErrors(projectId);
        }

        [HttpPost]
        public ErrorDTO Add([Required] ErrorDTO error)
        {
            return _errorService.Add(error);
        }

        [HttpPost]
        public ErrorSolutionDTO AddSolution([Required] ErrorSolutionDTO solution)
        {
            _errorService.AddSolution(solution);
            return solution;
        }

        [HttpPost]
        public UpdateErrorResponsibleDTO UpdateErrorResponsible([Required] UpdateErrorResponsibleDTO error)
        {
            return _errorService.UpdateErrorResponsible(error);
        }

        [HttpPost]
        public UpdateErrorDeadlineDTO UpdateErrorDeadline([Required] UpdateErrorDeadlineDTO error)
        {
            return _errorService.UpdateErrorDeadline(error);
        }

        [HttpPost]
        public UpdateErrorSPCEnumsDTO<Status> UpdateErrorStatus([Required] UpdateErrorSPCEnumsDTO<Status> error)
        {
            return _errorService.UpdateErrorStatus(error);
        }

        [HttpPost]
        public UpdateErrorSPCEnumsDTO<Priority> UpdateErrorPriority([Required] UpdateErrorSPCEnumsDTO<Priority> error)
        {
            return _errorService.UpdateErrorPriority(error);
        }

        [HttpPost]
        public UpdateErrorSPCEnumsDTO<Classification> UpdateErrorClassification([Required] UpdateErrorSPCEnumsDTO<Classification> error)
        {
            return _errorService.UpdateErrorClassification(error);
        }

        [HttpPut]
        public ErrorDTO UpdateError([Required] ErrorDTO error)
        {
            return _errorService.UpdateError(error);
        }
    }
}
