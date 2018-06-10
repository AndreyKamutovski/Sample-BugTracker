using AutoMapper;
using Sample_BugTracker.API.DTO;
using Sample_BugTracker.API.DTO.Error;
using Sample_BugTracker.DAL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Sample_BugTracker.API.App_Start
{
    public class AutoMapperConfig
    {
        public static void Initialize()
        {
            Mapper.Initialize(config =>
            {
                config.CreateMap<Project, ProjectDTO>()
                .ForMember(dest => dest.ProjectId, dest => dest.MapFrom(src => src.Id));
                config.CreateMap<ProjectDTO, Project>();
                config.CreateMap<PortalDTO, Portal>();
                config.CreateMap<Portal, PortalDTO>().ForMember(dest => dest.PortalId, dest => dest.MapFrom(src => src.Id));
                config.CreateMap<UserDTO, AppUser>().ForMember(dest => dest.UserName, dest => dest.MapFrom(src => src.Email));
                config.CreateMap<UserProject, UserDTO>().ForMember(dest => dest.Email, dest => dest.MapFrom(src => src.Worker.Email))
                                                        .ForMember(dest => dest.RoleName, dest => dest.MapFrom(src => src.Role.Name));
                                                        //.ForMember(dest => dest.AvatarBase64, dest => dest.MapFrom(src => src.Worker.Avatar));
                config.CreateMap<AppUser, UserDTO>();
                config.CreateMap<AttachUserDTO, UserDTO>();
                config.CreateMap<AttachUserDTO, AppUser>();
                config.CreateMap<Error, ErrorDTO>().ForMember(dest => dest.EmailAssignee, dest => dest.MapFrom(src => src.Assignee.Email))
                                                   .ForMember(dest => dest.EmailAuthor, dest => dest.MapFrom(src => src.Author.Email))
                                                   .ForMember(dest => dest.ErrorId, dest => dest.MapFrom(src => src.Id))
                                                   .ForMember(dest => dest.IsAttachments, dest => dest.MapFrom(src => src.Attachments.Count > 0));
                config.CreateMap<ErrorDTO, Error>();
                config.CreateMap<ErrorAttachment, AttachmentDTO>();
                config.CreateMap<SolutionAttachment, AttachmentDTO>();
                config.CreateMap<ErrorSolution, ErrorSolutionDTO>();
            });
        }
    }
}