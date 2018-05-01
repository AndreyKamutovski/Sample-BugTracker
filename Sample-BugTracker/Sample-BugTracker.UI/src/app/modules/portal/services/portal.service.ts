import { Injectable } from '@angular/core';
import { RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { HttpClientService } from '../../../shared/services/httpClient.service';
import { Portal } from '../models/portal.model';
import { Project } from '../../projects/models/project.model';


@Injectable()
export class PortalService {
  private readonly routerPrefix: string = "api/portal";
  

  constructor(private HttpClientService: HttpClientService) { }

  getPortalProjects(portalId: string): Observable<Project> {
    return this.HttpClientService.sendRequest(RequestMethod.Get, `${this.routerPrefix}/${portalId}/projects`);
  }

  public createPortal(portal: Portal): Observable<Portal> {
    return this.HttpClientService.sendRequest(RequestMethod.Post, `${this.routerPrefix}`, null, { 'Content-Type': 'application/json' }, portal);
  }

  public IsPortalTitleAvailable(title: string): Observable<boolean> {
    return this.HttpClientService.sendRequest(RequestMethod.Get, `${this.routerPrefix}`, { 'title': title });
  }

  public IsPortalOwner(portalId: string): Observable<boolean> {
    return this.HttpClientService.sendRequest(RequestMethod.Get, `${this.routerPrefix}`, { 'id': portalId });
  }
}
