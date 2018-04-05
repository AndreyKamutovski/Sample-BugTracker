import { Injectable } from '@angular/core';
import { RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { User } from '../../shared/models/user.model';
import { RequestService } from '../../shared/services/request.service';

@Injectable()
export class UsersService {

  constructor(private requestService: RequestService) { }

  getProjectUsers(projectId: string): Observable<User[]> {
    return this.requestService.sendRequest(RequestMethod.Get, "api/User", { 'projectId': projectId })
  }
}
