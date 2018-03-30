using Sample_BugTracker.API.Exceptions;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Filters;

namespace Sample_BugTracker.API.Filters
{
    public class ApplicationFilterException: ExceptionFilterAttribute
    {
        public override void OnException(HttpActionExecutedContext context)
        {
            if (context.Exception is ApplicationOperationException)
            {
                var rs = new HttpResponseMessage((context.Exception as ApplicationOperationException).StatusCode)
                {
                    Content = new StringContent(context.Exception.Message)
                };
                throw new HttpResponseException(rs);
            }
        }
    }
}