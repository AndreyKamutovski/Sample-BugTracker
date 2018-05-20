using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Sample_BugTracker.API.DTO.Error
{
    public class AttachmentDTO
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Upload date of error attachment is a required field")]
        public DateTime UploadDate { get; set; }

        [Required(ErrorMessage = "File name of error attachment is a required field")]
        public string FileName { get; set; }

        [Required(ErrorMessage = "Origin file name of error attachment is a required field")]
        public string OriginalFileName { get; set; }

        [Required(ErrorMessage = "Author of error attachment is a required field")]
        public UserDTO Author { get; set; }
    }
}