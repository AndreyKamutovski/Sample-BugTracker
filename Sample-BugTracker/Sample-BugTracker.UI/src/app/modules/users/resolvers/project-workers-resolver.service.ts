import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { UsersService } from '../users.service';

@Injectable()
export class ProjectWorkersResolverService implements Resolve<any> {


  constructor(private userService: UsersService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let projectId = +sessionStorage.getItem('projectID');
    return this.userService.getProjectWorkers(projectId);
  }
}
