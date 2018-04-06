import { Injectable } from '@angular/core';
import { RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { User } from '../../shared/models/user.model';
import { HttpClientService } from '../../shared/services/httpClient.service';

@Injectable()
export class UsersService {

  constructor(private HttpClientService: HttpClientService) { }

  getProjectUsers(projectId: string): Observable<User[]> {
    return this.HttpClientService.sendRequest(RequestMethod.Get, "api/User", { 'projectId': projectId })
  }

  getAll(): Observable<User[]> {
    return this.HttpClientService.sendRequest(RequestMethod.Get, "api/User");
  }
}
