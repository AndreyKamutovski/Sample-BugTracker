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

  private _currentProject: Project = new Project();
  get currentProject(): Project {
    return this._currentProject;
  }

  public getProjects() {
    return this.projectService.getProjects().toPromise().then(res => {
      this.projects = res;
    });
  }

  public pullCurrentProject() {
    return this.projectService.getProjectById(+sessionStorage.getItem('projectID')).toPromise().then(cp => {
      this._currentProject = cp;
    });
  }

}
