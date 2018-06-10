using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Sample_BugTracker.API.DTO.Statistics
{
    public class TeamStateDTO
    {
        [Required(ErrorMessage = "DelayCount is a required field")]
        public int DelayCount { get; set; }

        [Required(ErrorMessage = "TodayCount is a required field")]
        public int TodayCount { get; set; }

        [Required(ErrorMessage = "AllOpenedCount is a required field")]
        public int AllOpenedCount { get; set; }

        [Required(ErrorMessage = "AvatarBase64 is a required field")]
        public string AvatarBase64 { get; set; }

        [Required(ErrorMessage = "AssigneeEmail is a required field")]
        public string AssigneeEmail { get; set; }
    }
}