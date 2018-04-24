import { Injectable } from '@angular/core';
import { RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { HttpClientService } from '../../shared/services/httpClient.service';
import { AttachableUser } from './models/attachable-user.model';
import { UnattachUser } from './models/unattach-user.model';
import { User } from './models/user.model';

@Injectable()
export class UsersService {

  public readonly roles = [
    { value: 'Admin', viewValue: 'Администратор (Владелец портала)' },
    { value: 'Moderator', viewValue: 'Модератор' },
    { value: 'Worker', viewValue: 'Сотрудник' },
    { value: 'User', viewValue: 'Тестировщик' },
  ];

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
    return this.HttpClientService.sendRequest(RequestMethod.Post, "api/User/UploadUserAvatar", null, null, formData);  // { 'Content-Type': 'multipart/form-data' }
  }

  confirmAttachmentUser(confirm: any) {
    return this.HttpClientService.sendRequest(RequestMethod.Post, 'api/User/ConfirmAttachmentUser', null, null, confirm);
  }

  attachUser(attachUser: AttachableUser): Observable<User> {
    return this.HttpClientService.sendRequest(RequestMethod.Post, "api/User/AttachUser", null, { 'Content-Type': 'application/json' }, attachUser);
  }

  unattachUser(unattachUser: UnattachUser): Observable<void> {
    return this.HttpClientService.sendRequest(RequestMethod.Post, "api/User/UnattachUser", null, { 'Content-Type': 'application/json' }, unattachUser);
  }

  editAttachedUser(editAttachUser: AttachableUser): Observable<void> {
    return this.HttpClientService.sendRequest(RequestMethod.Post, "api/User/EditAttachedUser", null, { 'Content-Type': 'application/json' }, editAttachUser);
  }

  getProjectWorkers(projectId: number): Observable<User[]> {
    return this.HttpClientService.sendRequest(RequestMethod.Get, "api/User/GetProjectWorkers", { 'projectId': projectId });
  }
}
