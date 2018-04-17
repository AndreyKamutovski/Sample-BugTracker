import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { ErrorService } from '../error.service';

@Injectable()
export class ErrorListResolverService implements Resolve<any> {

  constructor(private errorService: ErrorService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let projectId = +sessionStorage.getItem('projectID');
    return this.errorService.getProjectErrors(projectId);
  }
}
