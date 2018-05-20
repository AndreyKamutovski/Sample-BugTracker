import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { ProjectService } from '../../shared/services/project.service';
import { Observable } from 'rxjs/Observable';
import { ErrorBT } from '../models/error.model';

@Injectable()
export class ErrorListResolverService implements Resolve<ErrorBT[]> {

  constructor(private projectService: ProjectService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ErrorBT[]>  {
    let projectId = +sessionStorage.getItem('projectID');
    return this.projectService.getProjectErrors(projectId);
  }
}
