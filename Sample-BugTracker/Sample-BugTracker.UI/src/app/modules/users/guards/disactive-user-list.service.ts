import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserListComponent } from '../components/user-list/user-list.component';
import { Observable } from 'rxjs/Observable';
import { ProjectService } from '../../shared/services/project.service';
import { ErrorListSharedService } from '../../shared/services/error-list-shared.service';

@Injectable()
export class DisactiveUserListService implements CanDeactivate<UserListComponent>{

  constructor(
    private projectService: ProjectService,
    private errorListSharedService: ErrorListSharedService,

  ) { }

  canDeactivate(component: UserListComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
  ): boolean | Observable<boolean> | Promise<boolean> {
    return this.projectService.getProjectWorkers(+sessionStorage.getItem('projectID')).toPromise().then(workers => {
      this.errorListSharedService.ProjectWorkers = workers;
      return true;
    }
    ).catch(error => {
      return false;
    });
  }


}
