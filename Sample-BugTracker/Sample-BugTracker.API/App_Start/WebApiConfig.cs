using Sample_BugTracker.API.Filters;
using System.Web.Http;
using System.Web.Http.Cors;

namespace Sample_BugTracker.API
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services
            config.Filters.Add(new ValidateDTOModelAttribute());
            config.Filters.Add(new ApplicationFilterException());

            // Web API routes
            config.MapHttpAttributeRoutes();


            config.Routes.MapHttpRoute(
                name: "BugTrackerApi",
                routeTemplate: "api/{controller}/{action}"
            );

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
