import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UsersService } from '../users.service';

@Injectable()
export class ProjectOwnerResolverService implements Resolve<any> {


  constructor(private userService: UsersService) { }
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let projectId = +sessionStorage.getItem('projectID');
    return this.userService.getProjectOwner(projectId);
  }
}
