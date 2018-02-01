using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Sample_BugTracker.API.DTO
{
    public class ProjectDTO
    {
        [Required(ErrorMessage = "Title of project is a required field")]
        [MinLength(3)]
        [MaxLength(100)]
        public string Title { get; set; }

        [Required(ErrorMessage = "DateStart of project is a required field")]
        public DateTime DateStart { get; set; }


        [Required(ErrorMessage = "DateEnd of project is a required field")]
        public DateTime DateEnd { get; set; }

        [Required(ErrorMessage = "Description of project is a required field")]
        [MinLength(10)]
        [MaxLength(1000)]
        public string Description { get; set; }
    }
}