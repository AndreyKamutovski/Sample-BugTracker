using Marvin.JsonPatch;
using Sample_BugTracker.API.DTO;
using Sample_BugTracker.API.DTO.Error.PartialUpdate;
using Sample_BugTracker.API.Filters;
using Sample_BugTracker.API.Services;
using Sample_BugTracker.DAL.Entities;
using Sample_BugTracker.DAL.Enumerations;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Net;
using System.Web.Http;

namespace Sample_BugTracker.API.Controllers
{
    [Authorize]
    [RoutePrefix("api/error")]
    public class ErrorController : ApiController
    {
        private ErrorService _errorService = new ErrorService();

        [HttpGet]
        [Route("{id:int:min(1)}")]
        public ErrorDTO GetById([Required] int id)
        {
            return _errorService.GetById(id);
        }

        [HttpPost]
        [Route("")]
        [HasPermissionAttribute(permission: PermissionList.ADDITION_ERROR)]
        public ErrorDTO Add([Required] int projectId, [Required, FromBody] ErrorDTO errorDto)
        {
            return _errorService.Add(projectId, errorDto);
        }

        [HttpPost]
        [Route("")]
        public ErrorSolutionDTO AddSolution([Required] ErrorSolutionDTO solution)
        {
            _errorService.AddSolution(solution);
            return solution;
        }

        [HttpPut]
        [Route("{id:int:min(1)}")]
        public ErrorDTO Update([Required] int id, [Required, FromBody]ErrorDTO errorDto)
        {
            return _errorService.Update(id, errorDto);
        }

        [HttpPatch]
        [Route("{id:int:min(1)}/assignee")]
        [CanEditErrorAttribute]
        [HasPermissionAttribute(permission: PermissionList.EDITING_ASSIGNEE_OF_ERROR)]
        public AssigneeUpdateDTO Assignee([Required] int id, [Required]AssigneeUpdateDTO assignee)
        {
            return _errorService.UpdateAssignee(id, assignee);
        }

        [HttpPatch]
        [Route("{id:int:min(1)}/status/{status:range(1,4)}")]
        [CanEditErrorAttribute]
        [HasPermissionAttribute(permission: PermissionList.EDITING_STATUS_OF_ERROR)]
        public Status Status([Required] int id, [Required]Status status)
        {
            return _errorService.UpdateStatus(id, status);
        }

        [HttpPatch]
        [Route("{id:int:min(1)}/deadline")]
        [CanEditErrorAttribute]
        [HasPermissionAttribute(permission: PermissionList.EDITING_DEADLINE_OF_ERROR)]
        public DeadlineUpdateDTO Deadline([Required] int id, [Required]DeadlineUpdateDTO deadline)
        {
            return _errorService.UpdateDeadline(id, deadline);
        }

        [HttpPatch]
        [Route("{id:int:min(1)}/priority/{priority:range(1,4)}")]
        [CanEditErrorAttribute]
        [HasPermissionAttribute(permission: PermissionList.EDITING_PRIORITY_OF_ERROR)]
        public Priority Priority([Required] int id, [Required]Priority priority)
        {
            return _errorService.UpdatePriority(id, priority);
        }

        [HttpPatch]
        [Route("{id:int:min(1)}/classification/{classification:range(1,6)}")]
        [CanEditErrorAttribute]
        [HasPermissionAttribute(permission: PermissionList.EDITING_CLASSIFICATION_OF_ERROR)]
        public Classification Classification([Required] int id, [Required]Classification classification)
        {
            return _errorService.UpdateClassification(id, classification);
        }

        [HttpPatch]
        [Route("{id:int:min(1)}/title")]
        [CanEditErrorTitleDescAttribute]
        //[HasPermissionAttribute(permission: PermissionList.EDITING_TITLE_DESCRIPTION_OF_ERROR)]
        public string Title([Required] int id, [Required]TitleUpdateDTO title)
        {
            return _errorService.UpdateTitle(id, title);
        }

        [HttpPatch]
        [Route("{id:int:min(1)}/description")]
        [CanEditErrorTitleDescAttribute]
        //[HasPermissionAttribute(permission: PermissionList.EDITING_TITLE_DESCRIPTION_OF_ERROR)]
        public string Description([Required] int id, [Required]DescriptionUpdateDTO description)
        {
            return _errorService.UpdateDescription(id, description);
        }
    }
}
