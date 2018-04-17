import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ProjectService } from '../project.service';

@Injectable()
export class CurrentProjectResolverService {

  constructor(private projectService: ProjectService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let projectId = +sessionStorage.getItem('projectID');
    return this.projectService.getProjectById(projectId);
  }
}
