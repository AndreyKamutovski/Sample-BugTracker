using Sample_BugTracker.DAL.Entities;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web;

namespace Sample_BugTracker.API.Services
{
    public class BaseAttachmentService: BaseService
    {
        protected HttpResponseMessage GetDownloadResponse(string root, BaseAttachment attachment)
        {
            var response = new HttpResponseMessage(HttpStatusCode.OK);
            var filePath = Path.Combine(root, attachment.FileName);
            var fileStream = new FileStream(filePath, FileMode.Open);
            response.Content = new StreamContent(fileStream);
            response.Content.Headers.ContentType = new MediaTypeHeaderValue("application/octet-stream");
            response.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment");
            response.Content.Headers.ContentDisposition.FileName = attachment.OriginalFileName;
            return response;
        }
    }
}