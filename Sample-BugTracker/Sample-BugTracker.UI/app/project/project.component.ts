import { Component } from '@angular/core';
import { ProjectService } from "../services/project.service";
import { Observable } from 'rxjs/Observable';
import { Project } from '../shared/models/project.model';

@Component({
    moduleId: module.id,
    selector: 'app-project',
    templateUrl: 'project.component.html',
    providers: [ProjectService]
})
export class ProjectComponent {
 constructor(private projectService: ProjectService) {};

 getProjects():{
     return this.projectService.getProjects().subscribe();
 };


}