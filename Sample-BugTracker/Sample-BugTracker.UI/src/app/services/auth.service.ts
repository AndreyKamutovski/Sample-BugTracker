import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Headers, Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { User } from '../shared/models/user.model';

export const REST_URI = new InjectionToken('REST_URI');

@Injectable()
export class AuthService {

    private _isLoggedIn: boolean;

    constructor(private http: Http,
        @Inject(REST_URI) private uri: string) {
        this._isLoggedIn = false;
        console.log('ctor AuthService');
    }


    get isLoggedIn(): boolean {
        return this._isLoggedIn;
    }

    login(user: User) {
        let body = new URLSearchParams();
        body.set('userName', user.email);
        body.set('password', user.password);
        body.set('grant_type', 'password');
        return this.http.post(this.uri + 'token', body)
            .map(response => {
                if (response.status == 200) {
                    localStorage.setItem('token', response.json().access_token);
                    this._isLoggedIn = true;
                }
                return response;
            }).catch((error: any) => {
                return Observable.throw('Error: ' + error.statusText + ' ' + error.status);
            });
    }

    logout(): void {
        this._isLoggedIn = false;
    }

    get authHaders() {
        return {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        };
    }
}