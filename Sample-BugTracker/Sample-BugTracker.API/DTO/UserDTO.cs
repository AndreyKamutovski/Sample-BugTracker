using System.ComponentModel.DataAnnotations;

namespace Sample_BugTracker.API.DTO
{
    public class UserDTO
    {
        [Required(ErrorMessage = "The email address is required")]
        [DataType(DataType.EmailAddress)]
        [Display(Name = "Email address")]
        [EmailAddress(ErrorMessage = "Invalid Email Address")]
        public string Email { get; set; }

        [Required(ErrorMessage = "The roleName is required")]
        [Display(Name = "User role")]
        public string RoleName { get; set; }

        [Required(ErrorMessage = "The password is required")]
        [StringLength(100, ErrorMessage = "The value {0} must contain at least {2} characters.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Confirm password")]
        [Compare("Password", ErrorMessage = "The password and its confirmation do not match.")]
        public string ConfirmPassword { get; set; }
    }
}