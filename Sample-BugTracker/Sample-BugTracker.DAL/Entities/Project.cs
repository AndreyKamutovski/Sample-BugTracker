using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace Sample_BugTracker.DAL.Entities
{
    public class Project
    {
        public Guid Id { get; set; }

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

        public ICollection<Error> Errors { get; set; }
    }
}
