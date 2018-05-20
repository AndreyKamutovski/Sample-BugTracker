using Sample_BugTracker.DAL.EF;
using Sample_BugTracker.DAL.Entities;
using Sample_BugTracker.DAL.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sample_BugTracker.DAL.Repositories
{
    class ErrorAttachmentRepository: Repository<ErrorAttachment>, IErrorAttachmentRepository
    {
        public ErrorAttachmentRepository(ApplicationDbContext context)
            : base(context)
        {
        }
    }
}
