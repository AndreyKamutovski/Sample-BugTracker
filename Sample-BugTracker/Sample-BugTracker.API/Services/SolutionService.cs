﻿using AutoMapper;
using Sample_BugTracker.API.DTO;
using Sample_BugTracker.API.DTO.Error;
using Sample_BugTracker.API.Exceptions;
using Sample_BugTracker.API.Providers;
using Sample_BugTracker.DAL.Entities;
using Sample_BugTracker.DAL.Enumerations;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace Sample_BugTracker.API.Services
{
    public class SolutionService : BaseService
    {
        private readonly string root;
        private SolutionAttachmentService _slnAttachmentService = new SolutionAttachmentService();

        public SolutionService()
        {
            root = HttpContext.Current.Server.MapPath("~/Content/SolutionAttachments");
        }

        public ErrorSolutionDTO Get(int id)
        {
            using (UoW)
            {
                var sln = UoW.Solutions.Get(id);
                if (sln == null)
                {
                    throw new ApplicationOperationException(string.Format("Solution with id {0} not found", id), HttpStatusCode.NotFound);
                }
                return Mapper.Map<ErrorSolutionDTO>(sln);
            }
        }

        public List<AttachmentDTO> GetAttachments(int id)
        {
            using (UoW)
            {
                var sln = UoW.Solutions.Get(id);
                if (sln == null)
                {
                    throw new ApplicationOperationException(string.Format("Solution with id {0} not found", id), HttpStatusCode.NotFound);
                }
                return Mapper.Map<List<AttachmentDTO>>(sln.Attachments);
            }
        }

        public ErrorSolutionDTO Add(int errorId, ErrorSolutionDTO sln)
        {

            using (UoW)
            {
                var error = UoW.Errors.Get(errorId);
                if (error == null)
                {
                    throw new ApplicationOperationException(string.Format("Error with id {0} not found", errorId), HttpStatusCode.NotFound);
                }
                if (error.Solution != null)
                {
                    Delete(error.Solution.Id);
                }
                error.Status = sln.ErrorStatus;
                var solution = new ErrorSolution()
                {
                    Error = error,
                    Description = sln.Description,
                    RecievingDate = DateTime.UtcNow,
                    Author = CurrentUser
                };
                UoW.Solutions.Add(solution);
                UoW.Complete();
                return Mapper.Map<ErrorSolutionDTO>(solution);
            }
        }

        public async Task<List<AttachmentDTO>> AddAttachments(int id, HttpRequestMessage request)
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
                    var solution = UoW.Solutions.Get(id);
                    if (solution == null)
                    {
                        throw new ApplicationOperationException(string.Format("Solution with id {0} not found", id), HttpStatusCode.NotFound);
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

        public ErrorSolutionDTO Update(int id, ErrorSolutionDTO sln)
        {
            using (UoW)
            {
                var solution = UoW.Solutions.Get(id);
                if (solution == null)
                {
                    throw new ApplicationOperationException(string.Format("Solution with id {0} not found", id), HttpStatusCode.NotFound);
                }
                solution.Error.Status = sln.ErrorStatus;
                solution.Description = sln.Description;
                solution.RecievingDate = DateTime.UtcNow;
                solution.Author = CurrentUser;
                UoW.Complete();
                return Mapper.Map<ErrorSolutionDTO>(solution);
            }
        }

        public void Delete(int id)
        {
            using (var uow = CreateUnitOfWork())
            {
                var solution = uow.Solutions.Get(id);
                if (solution == null)
                {
                    throw new ApplicationOperationException(string.Format("Solution with id {0} not found", id), HttpStatusCode.NotFound);
                }
                if (solution.Attachments != null)
                {
                    foreach (var attachment in solution.Attachments)
                    {
                        _slnAttachmentService.Delete(attachment.Id);
                    }
                }
                uow.Solutions.Remove(solution);
            }
        }
    }
}