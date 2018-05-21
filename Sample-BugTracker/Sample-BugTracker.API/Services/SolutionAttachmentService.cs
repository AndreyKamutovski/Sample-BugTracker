using AutoMapper;
using Sample_BugTracker.API.DTO.Error;
using Sample_BugTracker.API.Exceptions;
using Sample_BugTracker.API.Providers;
using Sample_BugTracker.DAL.Entities;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace Sample_BugTracker.API.Services
{
    public class SolutionAttachmentService: BaseAttachmentService
    {
        private readonly string  root;

        public SolutionAttachmentService()
        {
            root = HttpContext.Current.Server.MapPath("~/Content/SolutionAttachments");
        }

        public List<AttachmentDTO> Get(int solutionId)
        {
            using (UoW)
            {
                var sln = UoW.Solutions.Get(solutionId);
                if (sln == null)
                {
                    throw new ApplicationOperationException(string.Format("Solution with solutionId {0} not found", solutionId), HttpStatusCode.NotFound);
                }
                return Mapper.Map<List<AttachmentDTO>>(sln.Attachments);
            }
        }

        public async Task<List<AttachmentDTO>> Add(int solutionId, HttpRequestMessage request)
        {
            try
            {
                // Check if the request contains multipart/form-data.
                if (!request.Content.IsMimeMultipartContent())
                {
                    throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);
                }

                using (UoW)
                {
                    var solution = UoW.Solutions.Get(solutionId);
                    if (solution == null)
                    {
                        throw new ApplicationOperationException(string.Format("Solution with solutionId {0} not found", solutionId), HttpStatusCode.NotFound);
                    }

                    var provider = new StreamProvider(root);
                    await request.Content.ReadAsMultipartAsync(provider);

                    var attachments = new List<SolutionAttachment>();
                    foreach (MultipartFileData file in provider.FileData)
                    {
                        var attachment = new SolutionAttachment()
                        {
                            Author = CurrentUser,
                            Solution = solution,
                            UploadDate = DateTime.UtcNow,
                            OriginalFileName = file.Headers.ContentDisposition.FileName.Replace("\"", string.Empty),
                            FileName = file.LocalFileName.Substring(file.LocalFileName.LastIndexOf('\\') + 1)
                        };
                        attachments.Add(attachment);
                    }
                    UoW.SolutionAttachments.AddRange(attachments);
                    UoW.Complete();
                    return Mapper.Map<List<AttachmentDTO>>(attachments);
                }
            }
            catch (System.Exception e)
            {
                throw new ApplicationOperationException(e.Message, HttpStatusCode.InternalServerError);
            }
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