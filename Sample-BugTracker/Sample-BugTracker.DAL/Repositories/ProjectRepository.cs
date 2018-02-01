using Sample_BugTracker.DAL.EF;
using Sample_BugTracker.DAL.Entities;
using Sample_BugTracker.DAL.Interfaces;
using System;
using System.Collections.Generic;

namespace Sample_BugTracker.DAL.Repositories
{
    public class ProjectRepository : Repository<Project>, IProjectRepository
    {
        
        public ProjectRepository(ApplicationDbContext context)
            : base(context)
        {
        }

        public ApplicationDbContext ApplicationContext
        {
            get
            {
                return base.Context as ApplicationDbContext;
            }
        }
    }
}
