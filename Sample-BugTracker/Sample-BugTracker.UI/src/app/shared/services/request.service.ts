import { Inject, Injectable } from '@angular/core';
import { Headers, Http, RequestMethod } from '@angular/http';

import { AuthService, REST_URI } from '../../services/auth.service';

@Injectable()
export class RequestService {

  constructor(private http: Http, private authService: AuthService,
    @Inject(REST_URI) private uri: string) { }

  public sendRequest(
    _method: RequestMethod,
    _url: string,
    _params?: { [key: string]: any },
    _headers?: any,
    _body?: any) {

    return this.http.request(this.uri.concat(_url), {
      method: _method,
      params: _params,
      headers: new Headers({ ...this.authService.authHaders, ..._headers }),
      body: _body
    }).map(res => res.json());
  }
}
