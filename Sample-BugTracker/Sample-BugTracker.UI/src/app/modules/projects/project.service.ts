import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { HttpClientService } from '../../shared/services/httpClient.service';
import { AttachableUser } from '../users/models/attachable-user.model';
import { Project } from './models/project.model';




@Injectable()
export class ProjectService {

    constructor(private HttpClientService: HttpClientService) { }

    addProject(project: Project): Observable<Project> {
        return this.HttpClientService.sendRequest(RequestMethod.Post, 'api/Project/Add', null, { 'Content-Type': 'application/json' }, project);
    }

    getProjectById(projectId: number): Observable<Project> {
        return this.HttpClientService.sendRequest(RequestMethod.Get, `api/Project`, { 'projectId': projectId });
    }

    getPortalProjects(portalId: string): Observable<Project> {
        return this.HttpClientService.sendRequest(RequestMethod.Get, `api/Project`, { 'portalId': portalId });
    }

    attachUser(attachUser: AttachableUser): Observable<boolean> {
        return this.HttpClientService.sendRequest(RequestMethod.Post, "api/Project/AttachUser", null, { 'Content-Type': 'application/json' }, attachUser);
    }
}