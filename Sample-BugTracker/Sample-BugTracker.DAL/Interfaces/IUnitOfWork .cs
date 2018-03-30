using System;

namespace Sample_BugTracker.DAL.Interfaces
{
    public interface IUnitOfWork: IDisposable
    {
        IUserRepository Users { get;}
        IErrorRepository Errors { get; }
        IProjectRepository Projects { get; }
        IPortalRepository Portals { get; }
        int Complete();
    }
}
