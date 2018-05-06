using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Sample_BugTracker.API.DTO.Error.PartialUpdate
{
    public class TitleUpdateDTO
    {
        [Required(ErrorMessage = "Title of error is a required field")]
        [MinLength(3)]
        [MaxLength(100)]
        public string Title { get; set; }
    }
}