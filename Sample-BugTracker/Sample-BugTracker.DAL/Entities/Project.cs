using System;
using System.Collections.Generic;

namespace Sample_BugTracker.DAL.Entities
{
    public class Project
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public DateTime DateStart { get; set; }

        public DateTime DateEnd { get; set; }

        public string Description { get; set; }

        public ICollection<Error> Errors { get; set; }
    }
}
