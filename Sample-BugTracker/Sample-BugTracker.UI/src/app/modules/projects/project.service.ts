import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { HttpClientService } from '../../shared/services/httpClient.service';
import { User } from '../users/models/user.model';
import { Project } from './models/project.model';
import { ErrorBT } from '../errors/models/error.model';




@Injectable()
export class ProjectService {
    private readonly routerPrefix: string = "api/project";

    private get getPortalId(): string {
        return sessionStorage.getItem('portalID');
    }

    constructor(private HttpClientService: HttpClientService) { }

    getProjectUsers(projectId: number): Observable<User[]> {
        return this.HttpClientService.sendRequest(RequestMethod.Get, `${this.routerPrefix}/${projectId}/users`)
    }

    getProjectOwner(projectId: number): Observable<User> {
        return this.HttpClientService.sendRequest(RequestMethod.Get, `${this.routerPrefix}/${projectId}/owner`);
    }

    getProjectWorkers(projectId: number): Observable<User[]> {
        return this.HttpClientService.sendRequest(RequestMethod.Get, `${this.routerPrefix}/${projectId}/workers`);
    }

    getProjectErrors(projectId: number): Observable<ErrorBT> {
        return this.HttpClientService.sendRequest(RequestMethod.Get, `${this.routerPrefix}/${projectId}/errors`);
    }

    addProject(project: Project): Observable<Project> {
        return this.HttpClientService.sendRequest(RequestMethod.Post, `${this.routerPrefix}`, { 'portalId': this.getPortalId }, { 'Content-Type': 'application/json' }, project);
    }

    updateProject(projectId: number, project: Project): Observable<Project> {
        return this.HttpClientService.sendRequest(RequestMethod.Put, `${this.routerPrefix}/${projectId}`, { 'portalId': this.getPortalId }, { 'Content-Type': 'application/json' }, project);
    }

    deleteProject(projectId: number): Observable<void> {
        return this.HttpClientService.sendRequest(RequestMethod.Delete, `${this.routerPrefix}/${projectId}`, { 'portalId': this.getPortalId });
    }

    getProjectById(projectId: number): Observable<Project> {
        return this.HttpClientService.sendRequest(RequestMethod.Get, `${this.routerPrefix}/${projectId}`);
    }

    // getUserRoleForProject(projectId: number): Observable<string> {
    //     return this.HttpClientService.sendRequest(RequestMethod.Get, `api/Project/GetUserRoleForProject`, { 'projectId': projectId });
    // }
}