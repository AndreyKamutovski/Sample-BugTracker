using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Sample_BugTracker.API.DTO.Error.PartialUpdate
{
    public class AssigneeUpdateDTO
    {
        //[Required(ErrorMessage = "EmailAssignee of error is a required field")]
        [DataType(DataType.EmailAddress)]
        [Display(Name = "Email address of error assignee")]
        [EmailAddress(ErrorMessage = "Invalid Email Address of error assignee")]
        public string EmailAssignee { get; set; }
    }
}