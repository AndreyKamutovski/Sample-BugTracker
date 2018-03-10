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

    projects: Project[] = [];
    project: Project = new Project();

    constructor(private projectService: ProjectService) { };

    getProjects() {
        return this.projects;
    }

    addProject() {
        this.projectService.addProject(this.project).subscribe(
            res => {
                this.projects.push(res)
            }
        );
    }

    ngOnInit() {
        this.projectService.getProjects().subscribe(projects => this.projects = projects);
    }

}

//https://www.npmjs.com/package/ng2-date-picker