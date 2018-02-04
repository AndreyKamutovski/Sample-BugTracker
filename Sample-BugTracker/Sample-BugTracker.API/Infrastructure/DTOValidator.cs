using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace Sample_BugTracker.BLL.Infrastructure
{
    public class DTOValidator
    {
        public List<string> ValidationResults { get; private set; }

        public bool Validate()
        {
            var context = new ValidationContext(this);
            var validationResults = new List<ValidationResult>();
            var resultValidationFlag = Validator.TryValidateObject(this, context, validationResults, true);
            ValidationResults = validationResults.Select(errMsg => errMsg.ErrorMessage).ToList();
            return resultValidationFlag;
        }
    }
}
