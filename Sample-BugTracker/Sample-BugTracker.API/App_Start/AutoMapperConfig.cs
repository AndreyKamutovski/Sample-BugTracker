using AutoMapper;
using Sample_BugTracker.API.DTO;
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
                config.CreateMap<Project, ProjectDTO>();
                config.CreateMap<ProjectDTO, Project>();
                config.CreateMap<PortalDTO, Portal>();
                config.CreateMap<UserDTO, AppUser>().ForMember(dest => dest.UserName, dest => dest.MapFrom(src => src.Email));
                config.CreateMap<UserProject, UserDTO>().ForMember(dest => dest.Email, dest => dest.MapFrom(src => src.Worker.Email))
                                                        .ForMember(dest => dest.RoleName, dest => dest.MapFrom(src => src.Role.Name))
                                                        .ForMember(dest => dest.Avatar, dest => dest.MapFrom(src => src.Worker.Avatar));
                config.CreateMap<AppUser, UserDTO>();
                config.CreateMap<AttachUserDTO, UserDTO>();
                config.CreateMap<AttachUserDTO, AppUser>();
                config.CreateMap<Error, ErrorDTO>().ForMember(dest => dest.EmailErrorResponsible, dest => dest.MapFrom(src => src.ErrorResponsible.Email))
                                                   .ForMember(dest => dest.EmailErrorAuthor, dest => dest.MapFrom(src => src.ErrorAuthor.Email));
                config.CreateMap<ErrorDTO, Error>();

            });
        }
    }
}