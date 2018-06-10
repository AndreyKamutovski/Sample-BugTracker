import { Injectable } from '@angular/core';
import { UsersService } from '../../shared/services/users.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserHavePortalResolverService {

  constructor(private userService: UsersService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.userService.userHavePortal();
  }
}
