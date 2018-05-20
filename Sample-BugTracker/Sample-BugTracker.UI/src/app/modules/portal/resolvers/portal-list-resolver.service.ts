import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { UsersService } from '../../shared/services/users.service';
import { Portal } from '../models/portal.model';

@Injectable()
export class PortalListResolverService {

  constructor(private userService: UsersService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Portal[]> {
    return this.userService.getUserPortals();
  }
}