import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { ProjectService } from '../../projects/project.service';

@Injectable()
export class ErrorListResolverService implements Resolve<any> {

  constructor(private projectService: ProjectService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let projectId = +sessionStorage.getItem('projectID');
    return this.projectService.getProjectErrors(projectId);
  }
}
