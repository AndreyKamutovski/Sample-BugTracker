import { Injectable } from '@angular/core';
import { RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { HttpClientService } from '../../shared/services/httpClient.service';
import { AttachableUser } from './models/attachable-user.model';
import { UnattachUser } from './models/unattach-user.model';
import { User } from './models/user.model';
import { Portal } from '../portal/models/portal.model';

@Injectable()
export class UsersService {

  public readonly roles = [
    { value: 'Admin', viewValue: 'Администратор (Владелец портала)' },
    { value: 'Moderator', viewValue: 'Модератор' },
    { value: 'Worker', viewValue: 'Сотрудник' },
    { value: 'User', viewValue: 'Тестировщик' },
  ];

  private readonly routerPrefix: string = "api/user";
  
  constructor(private HttpClientService: HttpClientService) { }

  getAttachableUsers(projectId: string): Observable<User[]> {
    return this.HttpClientService.sendRequest(RequestMethod.Get, `${this.routerPrefix}`, { 'projectId': projectId });
  }

  getAll(): Observable<User[]> {
    return this.HttpClientService.sendRequest(RequestMethod.Get, `${this.routerPrefix}`);
  }

  getCurrentUser(): Observable<User> {
    return this.HttpClientService.sendRequest(RequestMethod.Get, `${this.routerPrefix}/current`);
  }

  getUserPortals(): Observable<Portal[]> {
    return this.HttpClientService.sendRequest(RequestMethod.Get, `${this.routerPrefix}/portals`);
  }
  
  uploadAvatar(formData: FormData): Observable<any> {
    return this.HttpClientService.sendRequest(RequestMethod.Post, `${this.routerPrefix}`, null, null, formData);  // { 'Content-Type': 'multipart/form-data' }
  }

  confirmAttachmentUser(confirm: any) {
    return this.HttpClientService.sendRequest(RequestMethod.Post, `${this.routerPrefix}/confirm`, null, null, confirm);
  }

  attachUser(attachUser: AttachableUser): Observable<User> {
    return this.HttpClientService.sendRequest(RequestMethod.Post, `${this.routerPrefix}/attach`, null, { 'Content-Type': 'application/json' }, attachUser);
  }

  unattachUser(unattachUser: UnattachUser): Observable<void> {
    return this.HttpClientService.sendRequest(RequestMethod.Post, `${this.routerPrefix}/unattach`, null, { 'Content-Type': 'application/json' }, unattachUser);
  }

  updateAttachedUser(updateAttachUser: AttachableUser): Observable<void> {
    return this.HttpClientService.sendRequest(RequestMethod.Put, `${this.routerPrefix}/update`, null, { 'Content-Type': 'application/json' }, updateAttachUser);
  }
}
