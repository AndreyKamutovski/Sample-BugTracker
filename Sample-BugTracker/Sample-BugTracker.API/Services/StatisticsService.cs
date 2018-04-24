using Sample_BugTracker.API.DTO.Error;
using Sample_BugTracker.API.Exceptions;
using Sample_BugTracker.DAL.Entities;
using Sample_BugTracker.DAL.Enumerations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;

namespace Sample_BugTracker.API.Services
{
    public class StatisticsService : BaseService
    {
        public StatisticsErrorDTO GetProjectErrorReport(int projectId)
        {
            using (var uow = CreateUnitOfWork())
            {
                Project project = uow.Projects.Get(projectId);
                if (project == null)
                {
                    throw new ApplicationOperationException(string.Format("Project with id {0} not found", projectId), HttpStatusCode.NotFound);
                }
                int total = project.Errors.Count;
                if (total > 0)
                {
                    int closed = project.Errors.Where(e => e.Status == Status.CLOSED).Count();
                    int opened = total - closed;
                    int progressPercentage = (int)Math.Round((double)(100 * closed) / total);
                    var statisticsError = new StatisticsErrorDTO()
                    {
                        Total = total,
                        ClosedErrorCount = closed,
                        OpenErrorCount = opened,
                        ProgressPercentage = progressPercentage
                    };
                    return statisticsError;
                }
                else return new StatisticsErrorDTO();
            }

        }
    }
}