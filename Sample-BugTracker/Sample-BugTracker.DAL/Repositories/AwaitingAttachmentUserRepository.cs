﻿using Sample_BugTracker.DAL.EF;
using Sample_BugTracker.DAL.Entities;
using Sample_BugTracker.DAL.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sample_BugTracker.DAL.Repositories
{
    public class AwaitingAttachmentUserRepository: Repository<AwaitingAttachmentUser>, IAwaitingAttachmentUser
    {
        public AwaitingAttachmentUserRepository(ApplicationDbContext context)
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
