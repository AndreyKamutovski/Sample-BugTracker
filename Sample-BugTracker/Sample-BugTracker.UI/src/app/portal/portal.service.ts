import { Injectable } from '@angular/core';
import { RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Portal } from '../shared/models/portal.model';
import { HttpClientService } from '../shared/services/httpClient.service';

@Injectable()
export class PortalService {

  constructor(private HttpClientService: HttpClientService) { }

  public createPortal(portal: Portal): Observable<void> {
    return this.HttpClientService.sendRequest(RequestMethod.Post, 'api/Portal', null, { 'Content-Type': 'application/json' }, portal);
  }

  public CheckPortalTitleNotTaken(title: string): Observable<boolean> {
    return this.HttpClientService.sendRequest(RequestMethod.Get, 'api/Portal', { 'title': title });
  }
}
