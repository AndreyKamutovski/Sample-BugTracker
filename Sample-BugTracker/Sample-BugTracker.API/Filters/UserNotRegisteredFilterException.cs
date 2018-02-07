using Sample_BugTracker.BLL.Exceptions;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Filters;

namespace Sample_BugTracker.BLL.Filters
{
    public class UserNotRegisteredFilterException: ExceptionFilterAttribute
    {
        public override void OnException(HttpActionExecutedContext context)
        {
            if (context.Exception is UserNotRegisteredException)
            {
                var rs = new HttpResponseMessage(HttpStatusCode.InternalServerError)
                {
                    Content = new StringContent(context.Exception.Message),
                    ReasonPhrase = "User Not Registered"
                };
                throw new HttpResponseException(rs);
            }
        }
    }
}