import { Injectable } from '@angular/core';
import { RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { HttpClientService } from '../../shared/services/httpClient.service';
import { User } from './models/user.model';

@Injectable()
export class UsersService {

  constructor(private HttpClientService: HttpClientService) { }

  getProjectUsers(projectId: number): Observable<User[]> {
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

  getProjectOwner(projectId: number): Observable<User> {
    return this.HttpClientService.sendRequest(RequestMethod.Get, "api/User/GetProjectOwner", { 'projectId': projectId });    
  }

  uploadAvatar(formData: FormData): Observable<any> {
    return this.HttpClientService.sendRequest(RequestMethod.Post, "api/User", null, null, formData);  // { 'Content-Type': 'multipart/form-data' }
  }

  public confirmAttachmentUser(confirm: any) {
    return this.HttpClientService.sendRequest(RequestMethod.Post, 'api/Project/ConfirmAttachmentUser', null, null, confirm);
  }
}
