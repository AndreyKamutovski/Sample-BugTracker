import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { User } from '../shared/models/user.model';

export const REST_URI = new InjectionToken('REST_URI');

interface appUser {
    Email: string;
    role: string;
}

@Injectable()
export class AuthService {

    private _isLoggedIn: boolean;
    private _currentUser: appUser;

    constructor(private http: Http,
        @Inject(REST_URI) private uri: string,
        private router: Router
    ) {
        this._isLoggedIn = false;
        console.log('ctor AuthService');
    }


    get isLoggedIn(): boolean {
        return this._isLoggedIn;
    }

    get currentUser(): appUser {
        return this._currentUser;
    }

    login(user: User) {
        let body = new URLSearchParams();
        body.set('userName', user.Email);
        body.set('password', user.Password);
        body.set('grant_type', 'password');
        return this.http.post(this.uri + 'token', body)
            .map(res => {
                if (res.status == 200) {
                    sessionStorage.setItem('token', res.json().access_token);
                    this._isLoggedIn = true;
                    this._currentUser = { Email: user.Email, role: "" };
                }
                return res;
            }).catch((error: any) => {
                return Observable.throw('Error: ' + error.statusText + ' ' + error.status);
            });
    }

    logout(): void {
        sessionStorage.removeItem('token');
        this._isLoggedIn = false;
        this._currentUser = null;
        this.router.navigateByUrl('/');
    }

    get authHaders() {
        return {
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        };
    }
}