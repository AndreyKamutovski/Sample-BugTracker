import { Injectable } from '@angular/core';
import { RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { User } from '../../shared/models/user.model';
import { HttpClientService } from '../../shared/services/httpClient.service';

@Injectable()
export class UsersService {

  constructor(private HttpClientService: HttpClientService) { }

  getProjectUsers(projectId: string): Observable<User[]> {
    return this.HttpClientService.sendRequest(RequestMethod.Get, "api/User/GetProjectUsers", { 'projectId': projectId })
  }

  getAttachableUsers(projectId: string): Observable<User[]> {
    return this.HttpClientService.sendRequest(RequestMethod.Get, "api/User/GetAttachableUsers", { 'projectId': projectId });
  }

  getAll(): Observable<User[]> {
    return this.HttpClientService.sendRequest(RequestMethod.Get, "api/User");
  }

  getCurrentUser(): Observable<User> {
    return this.HttpClientService.sendRequest(RequestMethod.Get, "api/User/GetCurrentUser");
  }

  uploadAvatar(formData: FormData): Observable<any> {
    return this.HttpClientService.sendRequest(RequestMethod.Post, "api/User", null, null, formData);  // { 'Content-Type': 'multipart/form-data' }
  }
}
