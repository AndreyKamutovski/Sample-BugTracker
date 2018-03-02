import { Injectable, OpaqueToken, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Project } from "../shared/models/project.model";
import { RequestOptionsArgs, URLSearchParams, Response } from '@angular/http';
import { RequestOptions } from '@angular/http/src/base_request_options';
import { Observable } from 'rxjs/Observable';
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import { ProjectComponent } from '../project/project.component';

export const REST_URI = new OpaqueToken('REST_URI');

@Injectable()
export class ProjectService {

    constructor(private http: Http,
        @Inject(REST_URI) private uri: string) { }

    getProjects(): Observable<Project[]> {
        var requestOptions = new RequestOptions({
            headers: new Headers({
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            })
        });

        return this.http.get(this.uri + 'api/Project/GetAll', requestOptions).map(res => res.json());
    }
}