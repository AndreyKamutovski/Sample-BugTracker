using Sample_BugTracker.API.DTO.Error;
using Sample_BugTracker.API.DTO.Statistics;
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
        private UserService _userService = new UserService();
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

        public List<TopUserDTO> GetProjectTopUsers(int projectId)
        {
            using (var uow = CreateUnitOfWork())
            {
                Project project = uow.Projects.Get(projectId);
                if (project == null)
                {
                    throw new ApplicationOperationException(string.Format("Project with id {0} not found", projectId), HttpStatusCode.NotFound);
                }
                var topUserGroups = project.Errors.Where(e => e.Status == Status.CLOSED).GroupBy(e => e.Assignee != null ? e.Assignee : new AppUser() { Email = "not_assigned@mail.ru" });
                var topUsersDTO = new List<TopUserDTO>();
                foreach (var topUserGroup in topUserGroups)
                {
                    topUsersDTO.Add(new TopUserDTO()
                    {
                        Count = topUserGroup.Count(),
                        Email = topUserGroup.Key.Email,
                        AvatarBase64 = _userService.GetAvatarBase64(topUserGroup.Key.Avatar)
                    });
                }
                return topUsersDTO.OrderByDescending(tUser => tUser.Count).Take(5).ToList();
            }
        }

        public List<DelayErrorDTO> GetProjectDelayErrors(int projectId)
        {
            using (var uow = CreateUnitOfWork())
            {
                Project project = uow.Projects.Get(projectId);
                if (project == null)
                {
                    throw new ApplicationOperationException(string.Format("Project with id {0} not found", projectId), HttpStatusCode.NotFound);
                }
                var nowUtc = DateTime.UtcNow;
                var delayErrors = project.Errors.Where(e => e.Deadline <= nowUtc && e.Status != Status.CLOSED)
                    .Select(eD => new DelayErrorDTO()
                    {
                        Id = eD.Id,
                        Delay = (int)Math.Round(nowUtc.Date.Subtract(eD.Deadline.Value.Date).TotalDays),
                        Title = eD.Title,
                        AvatarAssigneeBase64 = _userService.GetAvatarBase64(eD.Assignee.Avatar),
                        AssigneeEmail = eD.Assignee.Email
                    })
                    .OrderByDescending(eD => eD.Delay).ToList();
                return delayErrors;
            }
        }


        public List<TeamStateDTO> GetProjectTeamState(int projectId)
        {
            using (var uow = CreateUnitOfWork())
            {
                Project project = uow.Projects.Get(projectId);
                if (project == null)
                {
                    throw new ApplicationOperationException(string.Format("Project with id {0} not found", projectId), HttpStatusCode.NotFound);
                }
                var teamStateItemsDTO = new List<TeamStateDTO>();
                var utcNow = DateTime.UtcNow; 
                var teamStateGroups = project.Errors.Where(e => e.Assignee != null && e.Status != Status.CLOSED).GroupBy(e => e.Assignee);
                foreach (var teamStateGroup in teamStateGroups)
                {
                    teamStateItemsDTO.Add(new TeamStateDTO()
                    {
                        DelayCount = teamStateGroup.Where(e => e.Deadline.HasValue ? (e.Deadline.Value.Date < utcNow.Date) : false).Count(),
                        TodayCount = teamStateGroup.Where(e => e.Deadline.HasValue ? (e.Deadline.Value.Date == utcNow.Date) : false).Count(),
                        AllOpenedCount = teamStateGroup.Count(),
                        AvatarBase64 = _userService.GetAvatarBase64(teamStateGroup.Key.Avatar),
                        AssigneeEmail = teamStateGroup.Key.Email
                    });
                }
                var allProjectUsers = project.UserProjects.Select(up => up.Worker).ToList();
                if(teamStateItemsDTO.Count < allProjectUsers.Count)
                {
                    foreach(var user in allProjectUsers)
                    {
                        if(!teamStateItemsDTO.Exists(tS => tS.AssigneeEmail == user.Email))
                        {
                            teamStateItemsDTO.Add(new TeamStateDTO()
                            {
                                DelayCount = 0,
                                TodayCount = 0,
                                AllOpenedCount = 0,
                                AvatarBase64 = _userService.GetAvatarBase64(user.Avatar),
                                AssigneeEmail = user.Email
                            });
                        }
                        
                    }
                }
                return teamStateItemsDTO;
            }
        }

        public MyWorkReportDTO GetMyWorkReport(string portalId)
        {
            using (var uow = CreateUnitOfWork())
            {
                Portal portal = uow.Portals.Get(portalId);
                if (portal == null)
                {
                    throw new ApplicationOperationException(string.Format("Portal with id {0} not found", portalId), HttpStatusCode.NotFound);
                }
                var portalErrors = CurrentUser.AssigneeErrors.Where(e => e.Project.Portal.Id == portal.Id).ToList();
                var workReport = new MyWorkReportDTO() {
                    OpenErrorCount = portalErrors.Where(e => e.Status != Status.CLOSED).Count(),
                    ClosedErrorCount = portalErrors.Where(e => e.Status == Status.CLOSED).Count(),
                };
                return workReport;
            }
        }

        public List<MyErrorReportDTO> GetMyErrorReport(string portalId)
        {
            using (var uow = CreateUnitOfWork())
            {
                Portal portal = uow.Portals.Get(portalId);
                if (portal == null)
                {
                    throw new ApplicationOperationException(string.Format("Portal with id {0} not found", portalId), HttpStatusCode.NotFound);
                }
                var myErrors = CurrentUser.AssigneeErrors.Where(e => e.Project.Portal.Id == portal.Id).Select(e =>
                new MyErrorReportDTO()
                {
                    Id = e.Id,
                    Title = e.Title,
                    ProjectName = e.Project.Title,
                    Deadline = e.Deadline

                }).ToList();
                return myErrors;
            }
        }

        public List<MyErrorReportDTO> GetMyErrorReportToday(string portalId)
        {
            using (var uow = CreateUnitOfWork())
            {
                var utcNow = DateTime.UtcNow;
                Portal portal = uow.Portals.Get(portalId);
                if (portal == null)
                {
                    throw new ApplicationOperationException(string.Format("Portal with id {0} not found", portalId), HttpStatusCode.NotFound);
                }
                var myErrorsToday = CurrentUser.AssigneeErrors.Where(e => e.Project.Portal.Id == portal.Id && (e.Deadline.HasValue ? (e.Deadline.Value.Date == utcNow.Date) : false)).Select(e =>
                new MyErrorReportDTO()
                {
                    Id = e.Id,
                    Title = e.Title,
                    ProjectName = e.Project.Title,
                    Deadline = e.Deadline

                }).ToList();
                return myErrorsToday;
            }
        }

        public List<MyErrorDelayReportDTO> GetMyErrorDelayReport(string portalId)
        {
            using (var uow = CreateUnitOfWork())
            {
                var utcNow = DateTime.UtcNow;
                Portal portal = uow.Portals.Get(portalId);
                if (portal == null)
                {
                    throw new ApplicationOperationException(string.Format("Portal with id {0} not found", portalId), HttpStatusCode.NotFound);
                }
                var myDelayErrors = CurrentUser.AssigneeErrors.Where(e => e.Project.Portal.Id == portal.Id && (e.Deadline.HasValue ? (e.Deadline.Value.Date < utcNow.Date) : false) && e.Status != Status.CLOSED).Select(e =>
                new MyErrorDelayReportDTO()
                {
                    Id = e.Id,
                    Title = e.Title,
                    ProjectName = e.Project.Title,
                    Delay = (int)Math.Round(utcNow.Date.Subtract(e.Deadline.Value.Date).TotalDays),

                }).ToList();
                return myDelayErrors;
            }

        }

    }
}


