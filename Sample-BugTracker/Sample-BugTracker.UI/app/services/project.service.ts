import { Injectable, OpaqueToken, Inject } from '@angular/core';
import { Project } from "../shared/models/project.model";
import { Http, Headers, Response, RequestMethod, Request } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import { ProjectComponent } from '../project/project.component';
import { AuthService } from './auth.service';
import { REST_URI } from "./auth.service";


@Injectable()
export class ProjectService {

    constructor(private http: Http, private authService: AuthService,
        @Inject(REST_URI) private uri: string) { }

    getProjects(): Observable<Project[]> {
        return this.sendRequest(RequestMethod.Get, this.uri.concat('api/Project/GetAll'));
    }

    private sendRequest(verb: RequestMethod, uri: string, body?: Project) {
        return this.http.request(new Request({
            method: verb,
            url: uri,
            headers: this.authService.authHaders,
            body: body
        })).map(res => res.json());
    }
}