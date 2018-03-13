import { Component } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

import { ProjectService } from '../services/project.service';
import { Project } from '../shared/models/project.model';
import { FormControl, FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
    moduleId: module.id,
    selector: 'app-project',
    templateUrl: 'project.component.html'
})
export class ProjectComponent implements OnInit {

    projects: Project[] = [];
    addProjectForm: FormGroup;

    constructor(private projectService: ProjectService, private formBuilder: FormBuilder) {
        this.addProjectForm = this.formBuilder.group({
            'title': ['', [Validators.required, Validators.minLength(3)]],
            'dateStart': [null, Validators.required],
            'dateEnd': [null, Validators.required],
            'description': ['', [Validators.required, Validators.minLength(10)]]
        });
    };


    get Projects(): Project[] {
        return this.projects;
    }

    addProject(): void {
        if (this.addProjectForm.valid) {
            this.projectService.addProject(this.addProjectForm.value).subscribe(
                res => {
                    this.projects.push(res);
                    this.addProjectForm.reset();
                }
            );
        }
    }

    ngOnInit() {
        this.projectService.getProjects().subscribe(projects => this.projects = projects);
    }

}

//https://www.npmjs.com/package/ng2-date-picker