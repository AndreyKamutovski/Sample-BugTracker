import { Injectable, OpaqueToken, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { User } from "../shared/models/user.model";
import { RequestOptionsArgs, URLSearchParams } from '@angular/http';
import { RequestOptions } from '@angular/http/src/base_request_options';
import { Observable } from 'rxjs/Observable';
import "rxjs/add/operator/map";

export const REST_URI = new OpaqueToken('REST_URI');

@Injectable()
export class AuthService {

    constructor(private http: Http,
        @Inject(REST_URI) private uri: string) { }

    login(user: User): Observable<boolean> {
        let body = new URLSearchParams();
        body.set('userName', user.email);
        body.set('password', user.password);
        body.set('grant_type', 'password');
        return this.http.post(this.uri + 'token', body).map(res => {
            if(res.ok) {
                localStorage.setItem('token', res.json().access_token);
                return true;
            }
            else return false;
        });
    }
}