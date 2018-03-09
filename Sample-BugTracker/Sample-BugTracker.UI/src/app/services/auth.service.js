"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var http_2 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw");
exports.REST_URI = new core_1.OpaqueToken('REST_URI');
var AuthService = (function () {
    function AuthService(http, uri) {
        this.http = http;
        this.uri = uri;
    }
    AuthService.prototype.login = function (user) {
        var body = new http_2.URLSearchParams();
        body.set('userName', user.email);
        body.set('password', user.password);
        body.set('grant_type', 'password');
        return this.http.post(this.uri + 'token', body)
            .map(function (response) {
            if (response.status == 200) {
                localStorage.setItem('token', response.json().access_token);
            }
            return response;
        }).catch(function (error) {
            return Observable_1.Observable.throw('Error: ' + error.statusText + ' ' + error.status);
        });
    };
    Object.defineProperty(AuthService.prototype, "authHaders", {
        get: function () {
            return new http_1.Headers({
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            });
        },
        enumerable: true,
        configurable: true
    });
    AuthService = __decorate([
        core_1.Injectable(),
        __param(1, core_1.Inject(exports.REST_URI)), 
        __metadata('design:paramtypes', [http_1.Http, String])
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map