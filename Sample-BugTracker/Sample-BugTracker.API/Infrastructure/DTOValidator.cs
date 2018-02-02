using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Sample_BugTracker.BLL.Infrastructure
{
    public class DTOValidator
    {
        public List<ValidationResult> ValidationResults { get; private set; }

        public bool Validate()
        {
            var context = new ValidationContext(this);
            return Validator.TryValidateObject(this, context, ValidationResults);
        }
    }
}
