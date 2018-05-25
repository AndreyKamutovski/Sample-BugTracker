﻿using AutoMapper;
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
using System.Net.Http.Headers;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace Sample_BugTracker.API.Services
{
    public class ErrorAttachmentService : BaseAttachmentService
    {
        public readonly string root;

        public ErrorAttachmentService()
        {
            root = HttpContext.Current.Server.MapPath("~/Content/ErrorAttachments");
        }

        public List<AttachmentDTO> Get(int errorId)
        {
            using (UoW)
            {
                var error = UoW.Errors.Get(errorId);
                if (error == null)
                {
                    throw new ApplicationOperationException(string.Format("Error with errorId {0} not found", errorId), HttpStatusCode.NotFound);
                }
                return Mapper.Map<List<AttachmentDTO>>(error.Attachments);
            }
        }

        public async Task<List<AttachmentDTO>> Add(int errorId, HttpRequestMessage request)
        {
            // Check if the request contains multipart/form-data.
            if (!request.Content.IsMimeMultipartContent())
            {
                throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);
            }

            var provider = new StreamProvider(root);

            try
            {
                await request.Content.ReadAsMultipartAsync(provider);
                using (UoW)
                {
                    var error = UoW.Errors.Get(errorId);
                    var attachments = new List<ErrorAttachment>();
                    if (error != null)
                    {
                        foreach (MultipartFileData file in provider.FileData)
                        {
                            var attachment = new ErrorAttachment()
                            {
                                Author = CurrentUser,
                                Error = error,
                                UploadDate = DateTime.UtcNow,
                                OriginalFileName = file.Headers.ContentDisposition.FileName.Replace("\"", string.Empty),
                                FileName = file.LocalFileName.Substring(file.LocalFileName.LastIndexOf('\\') + 1)
                            };
                            attachments.Add(attachment);
                        }
                        UoW.ErrorAttachments.AddRange(attachments);
                        UoW.Complete();
                    }
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
                    var attachment = uow.ErrorAttachments.Get(id);
                    if (attachment == null)
                    {
                        throw new ApplicationOperationException(string.Format("Attachment with id {0} not found", id), HttpStatusCode.NotFound);
                    }
                    System.IO.File.Delete(Path.Combine(root, attachment.FileName));
                    uow.ErrorAttachments.Remove(attachment);
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
                    var attachment = UoW.ErrorAttachments.Get(id);
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