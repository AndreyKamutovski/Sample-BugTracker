import { Injectable, OpaqueToken, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { User } from "../shared/models/user.model";
import { RequestOptionsArgs } from '@angular/http';
import { RequestOptions } from '@angular/http/src/base_request_options';
import { Observable } from 'rxjs/Observable';
import "rxjs/add/operator/map";

export const REST_URI = new OpaqueToken('REST_URI');

@Injectable()
export class AuthService {

    constructor(private http: Http,
        @Inject(REST_URI) private uri: string) { }

    login(user: User): Observable<any> {
        let headersPost = new Headers();
        headersPost.set('Content-Type', 'application/x-www-form-urlencoded');
        let  body = new URLSearchParams();
        body.set('userName', user.email);
        body.set('password', user.password);
        body.set('grant_type', 'password');
        return this.http.post(this.uri + 'token', body).map(res => res.headers);
    }

    test() {
        return this.http.get(this.uri + 'api/Account/test');
    }
}