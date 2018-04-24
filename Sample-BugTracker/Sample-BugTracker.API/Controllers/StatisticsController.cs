using Sample_BugTracker.API.DTO.Error;
using Sample_BugTracker.API.Services;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace Sample_BugTracker.API.Controllers
{
    [Authorize]
    public class StatisticsController : ApiController
    {
        private StatisticsService _statisticsService = new StatisticsService();

        [ActionName("ErrorReport")]
        public StatisticsErrorDTO GetProjectErrorReport([Required]int projectId)
        {
            return _statisticsService.GetProjectErrorReport(projectId);
        }
    }
}