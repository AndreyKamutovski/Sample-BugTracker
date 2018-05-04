import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { RequestMethod, URLSearchParams } from '@angular/http';

import { User } from '../../modules/users/models/user.model';
import { UsersService } from '../../modules/users/users.service';
import { HttpClientService } from './httpClient.service';




@Injectable()
export class AuthService {

    private _isLoggedIn: boolean = false;
    private _currentUser: User = new User();

    constructor(
        private HttpClientService: HttpClientService,
        private userService: UsersService,
    ) {
    }

    public isPortalOwner: boolean = false;

    get isLoggedIn(): boolean {
        return this._isLoggedIn;
    }

    get currentUser(): User {
        return this._currentUser;
    }

    login(user: User) {
        let body = new URLSearchParams();
        body.set('userName', user.Email);
        body.set('password', user.Password);
        body.set('grant_type', 'password');
        return this.HttpClientService.sendRequest(RequestMethod.Post, "token", null, null, body).toPromise().then(res => {
            sessionStorage.setItem('token', res.access_token);
            return this.userService.getCurrentUser().toPromise().then(user => {
                this._currentUser = user;
                this._isLoggedIn = true;
            });
        });
    }

    logout(): void {
        sessionStorage.removeItem('token');
        this._isLoggedIn = false;
        this._currentUser = null;
    }
}