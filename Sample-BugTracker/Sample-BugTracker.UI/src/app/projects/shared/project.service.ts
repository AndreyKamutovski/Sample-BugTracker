import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Inject, Injectable } from '@angular/core';
import { Http, Request, RequestMethod, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { AuthService, REST_URI } from '../../services/auth.service';
import { Project } from './project.model';


@Injectable()
export class ProjectService {

    constructor(private http: Http, private authService: AuthService,
        @Inject(REST_URI) private uri: string) { }

    getProjects(): Observable<Project[]> {
        return this.sendRequest(RequestMethod.Get, 'api/Project');
    }

    addProject(project: Project): Observable<Project> {
        return this.sendRequest(RequestMethod.Post, 'api/Project', project, {'Content-Type': 'application/json'});
    }

    getProjectById(id: number): Observable<Project> {
        return this.sendRequest(RequestMethod.Get, `api/Project/${id}`);
    }

    private sendRequest(_method: RequestMethod, _url: string, _body?: Project, _headers?: any) {
        return this.http.request(new Request({
            method: _method,
            url: this.uri.concat(_url),
            headers: new Headers({...this.authService.authHaders, ..._headers}),
            body: _body
        })).map(res => res.json());
    }
}