import { Injectable } from '@angular/core';
import { RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { PermissionList } from '../enums/permission-list.enum';
import { HttpClientService } from './httpClient.service';


@Injectable()
export class PermissionService {

  public Permission: PermissionList[];
  public PERMISSION_LIST: typeof PermissionList;

  constructor(
    private HttpClientService: HttpClientService,
  ) {
    this.PERMISSION_LIST = PermissionList;
  }

  getProjectPermission(projectId: number): Observable<PermissionList[]> {
    return this.HttpClientService.sendRequest(RequestMethod.Get, `api/project/${projectId}/permission`);
  }

  checkPermission(permission: PermissionList): boolean {
    return this.Permission.indexOf(permission) !== -1;
  }

}
