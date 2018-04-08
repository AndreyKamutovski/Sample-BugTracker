import { Injectable } from '@angular/core';
import { Project } from '../shared/project.model';
import { ProjectService } from './project.service';

@Injectable()
export class ProjectDataSourceService {

  constructor(private projectService: ProjectService) { }
  
  private projects: Project[] = [];
  get Projects(): Project[] {
    return this.projects;
  }


  public getProjects() {
    return this.projectService.getProjects().toPromise().then(res => {
      this.projects = res;
    });
  }

}
