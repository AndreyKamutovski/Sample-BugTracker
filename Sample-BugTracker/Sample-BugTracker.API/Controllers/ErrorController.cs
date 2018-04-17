using Sample_BugTracker.API.DTO;
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
    }
}
