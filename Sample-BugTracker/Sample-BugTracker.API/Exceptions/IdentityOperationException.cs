using System;
using System.Collections.Generic;
using System.Net;

namespace Sample_BugTracker.API.Exceptions
{
    public class IdentityOperationException : Exception
    {
        public HttpStatusCode StatusCode { get; private set; }
        public IdentityOperationException (string message) : base(message) { }
        public IdentityOperationException(string message, HttpStatusCode statusCode) : this(message) {
            StatusCode = statusCode;
        }

        public IdentityOperationException (IEnumerable<string> message) : base(string.Join("\n", message)) { }
        public IdentityOperationException(IEnumerable<string> message, HttpStatusCode statusCode) : this(message) {
            StatusCode = statusCode;
        }
    }
}