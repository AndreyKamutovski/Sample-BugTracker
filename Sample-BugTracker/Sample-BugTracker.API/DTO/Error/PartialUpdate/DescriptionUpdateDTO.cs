using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Sample_BugTracker.API.DTO.Error.PartialUpdate
{
    public class DescriptionUpdateDTO
    {
        [MaxLength(5000)]
        public string Description { get; set; }
    }
}