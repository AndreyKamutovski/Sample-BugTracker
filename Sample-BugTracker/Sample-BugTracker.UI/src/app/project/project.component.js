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
var core_1 = require('@angular/core');
var project_service_1 = require("../services/project.service");
var auth_service_1 = require('../services/auth.service');
var auth_service_2 = require("../services/auth.service");
var ProjectComponent = (function () {
    function ProjectComponent(projectService) {
        this.projectService = projectService;
    }
    ;
    ProjectComponent.prototype.getProjects = function () {
        var prs = [];
        this.projectService.getProjects().subscribe(function (data) { return prs = data; });
        return prs;
    };
    ;
    ProjectComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-project',
            templateUrl: 'project.component.html',
            providers: [project_service_1.ProjectService, auth_service_1.AuthService, { provide: auth_service_2.REST_URI, useValue: "http://" + location.hostname + ":2038/" }]
        }), 
        __metadata('design:paramtypes', [project_service_1.ProjectService])
    ], ProjectComponent);
    return ProjectComponent;
}());
exports.ProjectComponent = ProjectComponent;
//# sourceMappingURL=project.component.js.map