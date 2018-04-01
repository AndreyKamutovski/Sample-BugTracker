import { Inject, Injectable } from '@angular/core';
import { Headers, Http, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { REST_URI } from '../services/auth.service';
import { Portal } from '../shared/models/portal.model';

@Injectable()
export class PortalService {

  constructor(private http: Http, @Inject(REST_URI) private uri: string) { }

  public createPortal(portal: Portal): Observable<void> {
    return this.sendRequest(RequestMethod.Post, 'api/Portal', null, portal, { 'Content-Type': 'application/json' });
  }

  public CheckPortalTitleNotTaken(title: string): Observable<boolean> {
    return this.sendRequest(RequestMethod.Get, 'api/Portal', { 'title': title });
  }

  private sendRequest(_method: RequestMethod, _url: string, _params?: any, _body?: Portal, _headers?: any) {
    return this.http.request(this.uri.concat(_url), {
      method: _method,
      params: _params,
      headers: new Headers(_headers),
      body: _body
    }).map(res => res.json());
  }
}
