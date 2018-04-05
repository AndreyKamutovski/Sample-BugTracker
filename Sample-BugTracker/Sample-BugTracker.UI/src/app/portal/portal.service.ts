import { Injectable } from '@angular/core';
import { RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Portal } from '../shared/models/portal.model';
import { RequestService } from '../shared/services/request.service';

@Injectable()
export class PortalService {

  constructor(private requestService: RequestService) { }

  public createPortal(portal: Portal): Observable<void> {
    return this.requestService.sendRequest(RequestMethod.Post, 'api/Portal', null, { 'Content-Type': 'application/json' }, portal);
  }

  public CheckPortalTitleNotTaken(title: string): Observable<boolean> {
    return this.requestService.sendRequest(RequestMethod.Get, 'api/Portal', { 'title': title });
  }
}
