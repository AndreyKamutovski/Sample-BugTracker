import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Headers, Http, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';

export const REST_URI = new InjectionToken('REST_URI');


@Injectable()
export class HttpClientService {

  constructor(private http: Http,
    @Inject(REST_URI) private uri: string) { }

  public sendRequest(
    _method: RequestMethod,
    _url: string,
    _params?: { [key: string]: any },
    _headers?: any,
    _body?: any) {
    let authHeaders = { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` };
    return this.http.request(this.uri.concat(_url), {
      method: _method,
      params: _params,
      headers: new Headers({ ...authHeaders, ..._headers }),
      body: _body
    }).map(res => {
      if(res.status == 200) {
        return res.json();
      }})
      .catch((error: any) => {
        return Observable.throw('Error: ' + error.statusText + ' ' + error.status);
      });
  }
}
