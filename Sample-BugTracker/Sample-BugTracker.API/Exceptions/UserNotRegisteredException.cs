using System;
using System.Collections.Generic;

namespace Sample_BugTracker.BLL.Exceptions
{
    public class UserNotRegisteredException: Exception
    {
        public UserNotRegisteredException(string message) : base(message) { }
        public UserNotRegisteredException(IEnumerable<string> message) : base(string.Join("\n", message)) { }
    }
}