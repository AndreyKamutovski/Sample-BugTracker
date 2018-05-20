using AutoMapper;
using Sample_BugTracker.API.DTO.Error;
using Sample_BugTracker.API.Exceptions;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;

namespace Sample_BugTracker.API.Services
{
    public class SolutionAttachmentService: BaseAttachmentService
    {
        private readonly string  root;

        public SolutionAttachmentService()
        {
            root = HttpContext.Current.Server.MapPath("~/Content/SolutionAttachments");
        }

        public void Delete(int id)
        {
            try
            {
                using (var uow = CreateUnitOfWork())
                {
                    var attachment = uow.SolutionAttachments.Get(id);
                    if (attachment == null)
                    {
                        throw new ApplicationOperationException(string.Format("Solution attachment with id {0} not found", id), HttpStatusCode.NotFound);
                    }
                    System.IO.File.Delete(Path.Combine(root, attachment.FileName));
                    uow.SolutionAttachments.Remove(attachment);
                    uow.Complete();
                }
            }
            catch (System.Exception e)
            {
                throw new ApplicationOperationException(e.Message, HttpStatusCode.InternalServerError);
            }
        }

        public HttpResponseMessage Download(int id)
        {
            try
            {
                using (UoW)
                {
                    var attachment = UoW.SolutionAttachments.Get(id);
                    if (attachment == null)
                    {
                        throw new ApplicationOperationException(string.Format("Attachment with id {0} not found", id), HttpStatusCode.NotFound);
                    }
                    return GetDownloadResponse(root, attachment);
                }
            }
            catch (System.Exception e)
            {
                throw new ApplicationOperationException(e.Message, HttpStatusCode.InternalServerError);
            }
        }
    }
}