using Sample_BugTracker.DAL.Entities;
using System;

namespace Sample_BugTracker.DAL.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        IUserRepository Users { get; }
        IRoleRepository Roles { get; }
        IErrorRepository Errors { get; }
        IProjectRepository Projects { get; }
        IPortalRepository Portals { get; }
        IUserProjectRepository UserProjects { get; }
        IAwaitingAttachmentUser AwaitingAttachmentUsers { get; }
        IPermissionRepository Permission { get; }
        IErrorSolutionRepository Solutions { get; }
        ISolutionAttachmentRepository SolutionAttachments { get; }
        IErrorAttachmentRepository ErrorAttachments { get; }


        int Complete();
    }
}
