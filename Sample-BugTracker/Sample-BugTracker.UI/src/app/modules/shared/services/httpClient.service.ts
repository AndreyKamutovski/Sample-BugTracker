import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Headers, Http, RequestMethod, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Observable';

export const REST_URI = new InjectionToken('REST_URI');
export const AUTH_HEADER = new InjectionToken('AUTH_HEADER');

@Injectable()
export class HttpClientService {

  constructor(private http: Http,
    @Inject(REST_URI) private uri: string,
  ) { }

  public sendRequest(
    _method: RequestMethod,
    _url: string,
    _params?: { [key: string]: any },
    _headers?: any,
    _body?: any,
    _responseType?: ResponseContentType,
    _returnBodyAsJson: boolean = true
  ) {
    let authHeaders = { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` };
    return this.http.request(this.uri.concat(_url), {
      method: _method,
      params: _params,
      headers: new Headers({ ...authHeaders, ..._headers }),
      body: _body,
      responseType: _responseType
    }).map(res => {
      if (res.status == 200 && _returnBodyAsJson) {
        return res.json();
      }
      else {
        return res;
      }});
    // }).catch((error: any) => {      
    //     return Observable.throw('Error: ' + error.statusText + ' ' + error.status);
    //   })
  }
}
