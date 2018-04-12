import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { RequestMethod, URLSearchParams } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { UsersService } from '../projects/services/users.service';
import { User } from '../shared/models/user.model';
import { HttpClientService } from '../shared/services/httpClient.service';


@Injectable()
export class AuthService {

    private _isLoggedIn: boolean;
    private _currentUser: User = new User();

    constructor(
        private HttpClientService: HttpClientService,
        private userService: UsersService,
        private router: Router
    ) {
        this._isLoggedIn = false;
    }


    get isLoggedIn(): boolean {
        return this._isLoggedIn;
    }

    get currentUser(): User {
        this.userService.getCurrentUser().toPromise().then(user => {
            this._currentUser = user;
        });
        return this._currentUser;
    }

    login(user: User) {
        let body = new URLSearchParams();
        body.set('userName', user.Email);
        body.set('password', user.Password);
        body.set('grant_type', 'password');
        return this.HttpClientService.sendRequest(RequestMethod.Post, "token", null, null, body).toPromise().then(res => {
            sessionStorage.setItem('token', res.access_token);
            this._isLoggedIn = true;
            return this.userService.getCurrentUser().toPromise().then(user => {
                this._currentUser = user;
            });
        });
    }

    logout(): void {
        sessionStorage.removeItem('token');
        this._isLoggedIn = false;
        this._currentUser = null;
        this.router.navigateByUrl('/');
    }
}