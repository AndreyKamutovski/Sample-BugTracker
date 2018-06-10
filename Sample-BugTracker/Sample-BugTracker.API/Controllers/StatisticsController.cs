using Sample_BugTracker.API.DTO.Error;
using Sample_BugTracker.API.DTO.Statistics;
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
    [RoutePrefix("api/statistics")]
    public class StatisticsController : ApiController
    {
        private StatisticsService _statisticsService = new StatisticsService();

        [Route("{projectId:int:min(1)}")]
        public StatisticsErrorDTO GetProjectErrorReport([Required]int projectId)
        {
            return _statisticsService.GetProjectErrorReport(projectId);
        }

        [ActionName("TopUsers")]
        public List<TopUserDTO> GetProjectTopUsers([Required]int projectId)
        {
            return _statisticsService.GetProjectTopUsers(projectId);
        }

        [ActionName("DelayErrors")]
        public List<DelayErrorDTO> GetProjectDelayErrors([Required]int projectId)
        {
            return _statisticsService.GetProjectDelayErrors(projectId);
        }

        [ActionName("TeamState")]
        public List<TeamStateDTO> GetProjectTeamState([Required]int projectId)
        {
            return _statisticsService.GetProjectTeamState(projectId);
        }



        // main page - статистика в рамках портала по всем проектам
        [ActionName("MyWorkReport")]
        public MyWorkReportDTO GetMyWorkReport([Required]string portalId)
        {
            return _statisticsService.GetMyWorkReport(portalId);
        }

        [ActionName("MyErrorReport")]
        public List<MyErrorReportDTO> GetMyErrorReport([Required]string portalId)
        {
            return _statisticsService.GetMyErrorReport(portalId);
        }

        [ActionName("MyErrorReportToday")]
        public List<MyErrorReportDTO> GetMyErrorReportToday([Required]string portalId)
        {
            return _statisticsService.GetMyErrorReportToday(portalId);
        }

        [ActionName("MyErrorDelayReport")]
        public List<MyErrorDelayReportDTO> GetMyErrorDelayReport([Required]string portalId)
        {
            return _statisticsService.GetMyErrorDelayReport(portalId);
        }
    }
}