import { Component } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

import { ProjectService } from '../services/project.service';
import { Project } from '../shared/models/project.model';

@Component({
    moduleId: module.id,
    selector: 'app-project',
    templateUrl: 'project.component.html'
})
export class ProjectComponent implements OnInit {

    private _projects: Project[];
    constructor(private projectService: ProjectService) { };

    public get Projects(): Project[] {
        return this._projects;
    }

    ngOnInit() {
        this.projectService.getProjects().subscribe((projects: Project[]) => this._projects = projects);
    }
}