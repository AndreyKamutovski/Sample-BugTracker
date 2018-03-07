import { Component } from '@angular/core';
import { ProjectService } from "../services/project.service";
import { Observable } from 'rxjs/Observable';
import { Project } from '../shared/models/project.model';
import { AuthService } from '../services/auth.service';
import { REST_URI } from "../services/auth.service";

@Component({
    moduleId: module.id,
    selector: 'app-project',
    templateUrl: 'project.component.html',
    providers: [ProjectService, AuthService, { provide: REST_URI, useValue: `http://${location.hostname}:2038/` }]
})
export class ProjectComponent {
    constructor(private projectService: ProjectService) { };

    getProjects(): Project[] {
        let prs: Project[] = [];
        this.projectService.getProjects().subscribe(data => prs = data);
        return prs;
    };
}