using Sample_BugTracker.API.DTO.Error;
using Sample_BugTracker.DAL.Entities;
using Sample_BugTracker.DAL.Enumerations;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Sample_BugTracker.API.DTO
{
    public class ErrorSolutionDTO
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "ErrorStatus is a required field")]
        [Range(1, 4)]
        public Status ErrorStatus { get; set; }

        [Required(ErrorMessage = "Solution error text is a required field")]
        public string Description { get; set; }

        public DateTime RecievingDate { get; set; }

        public UserDTO Author { get; set; }

        //public List<AttachmentDTO> Attachments { get; set; }
    }
}