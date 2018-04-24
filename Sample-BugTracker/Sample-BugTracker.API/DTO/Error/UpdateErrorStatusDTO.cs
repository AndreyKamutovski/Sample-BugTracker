using Sample_BugTracker.DAL.Enumerations;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Sample_BugTracker.API.DTO
{
    public class UpdateErrorSPCEnumsDTO<T>
    {
        [Required(ErrorMessage = "ErrorId is a required field")]
        public int ErrorId { get; set; }

        [Required(ErrorMessage = "Status/Priority/Classification of error is a required field")]
        public T spc { get; set; }
    }
}