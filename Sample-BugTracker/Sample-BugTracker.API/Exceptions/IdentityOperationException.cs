using System;
using System.Collections.Generic;
using System.Net;

namespace Sample_BugTracker.API.Exceptions
{
    public class ApplicationOperationException : Exception
    {
        public HttpStatusCode StatusCode { get; private set; }
        public ApplicationOperationException (string message) : base(message) { }
        public ApplicationOperationException(string message, HttpStatusCode statusCode) : this(message) {
            StatusCode = statusCode;
        }

        public ApplicationOperationException (IEnumerable<string> message) : base(string.Join("\n", message)) { }
        public ApplicationOperationException(IEnumerable<string> message, HttpStatusCode statusCode) : this(message) {
            StatusCode = statusCode;
        }
    }
}