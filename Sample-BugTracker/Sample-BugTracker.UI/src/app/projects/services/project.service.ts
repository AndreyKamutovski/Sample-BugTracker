import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { HttpClientService } from '../../shared/services/httpClient.service';
import { Project } from '../shared/project.model';


@Injectable()
export class ProjectService {

    constructor(private HttpClientService: HttpClientService) { }

    getProjects(): Observable<Project[]> {
        return this.HttpClientService.sendRequest(RequestMethod.Get, 'api/Project');
    }

    addProject(project: Project): Observable<Project> {
        return this.HttpClientService.sendRequest(RequestMethod.Post, 'api/Project', null, { 'Content-Type': 'application/json' }, project);
    }

    getProjectById(id: number): Observable<Project> {
        return this.HttpClientService.sendRequest(RequestMethod.Get, `api/Project/${id}`);
    }
}