using System;

namespace Sample_BugTracker.DAL.Entities
{
    public class AwaitingAttachmentUser
    {
        public Guid Id { get; set; }

        public string Email { get; set; }

        public int ProjectId { get; set; }
        public virtual Project Project { get; set; }

        public string RoleId { get; set; }
        public virtual AppRole Role { get; set; }

    }
}
