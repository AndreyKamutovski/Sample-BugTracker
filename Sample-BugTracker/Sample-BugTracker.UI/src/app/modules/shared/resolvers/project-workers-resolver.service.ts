import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { ProjectService } from '../services/project.service';

@Injectable()
export class ProjectWorkersResolver implements Resolve<any> {


  constructor(private projectService: ProjectService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let projectId = +sessionStorage.getItem('projectID');
    return this.projectService.getProjectWorkers(projectId);
  }
}
