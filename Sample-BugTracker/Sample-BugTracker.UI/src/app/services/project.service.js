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
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw");
var auth_service_1 = require('./auth.service');
var auth_service_2 = require("./auth.service");
var ProjectService = (function () {
    function ProjectService(http, authService, uri) {
        this.http = http;
        this.authService = authService;
        this.uri = uri;
    }
    ProjectService.prototype.getProjects = function () {
        return this.sendRequest(http_1.RequestMethod.Get, this.uri.concat('api/Project/GetAll'));
    };
    ProjectService.prototype.sendRequest = function (verb, uri, body) {
        return this.http.request(new http_1.Request({
            method: verb,
            url: uri,
            headers: this.authService.authHaders,
            body: body
        })).map(function (res) { return res.json(); });
    };
    ProjectService = __decorate([
        core_1.Injectable(),
        __param(2, core_1.Inject(auth_service_2.REST_URI)), 
        __metadata('design:paramtypes', [http_1.Http, auth_service_1.AuthService, String])
    ], ProjectService);
    return ProjectService;
}());
exports.ProjectService = ProjectService;
//# sourceMappingURL=project.service.js.map