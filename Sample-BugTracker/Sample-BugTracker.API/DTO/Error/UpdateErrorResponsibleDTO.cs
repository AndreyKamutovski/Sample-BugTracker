using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Sample_BugTracker.API.DTO
{
    public class UpdateErrorResponsibleDTO
    {
        [Required(ErrorMessage = "ErrorId is a required field")]
        public int ErrorId { get; set; }

        public string EmailErrorResponsible { get; set; }
    }
}