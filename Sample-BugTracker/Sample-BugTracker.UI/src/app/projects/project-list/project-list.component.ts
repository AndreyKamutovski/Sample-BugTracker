import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

import { Project } from '../shared/project.model';
import { ProjectService } from '../shared/project.service';
import { Observable } from 'rxjs/Observable';
import { DataSource } from '@angular/cdk/table';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styles: []
})
export class ProjectListComponent implements OnInit {

  displayedColumns = ['title', 'countError', 'dateStart', 'dateEnd'];
  // public dataSource: MatTableDataSource<Project> = new MatTableDataSource<Project>();
    public dataSource = new ProjectDataSource(this.projectService);


  constructor(private projectService: ProjectService) {
    // this.dataSource._updateChangeSubscription();
   }

  ngOnInit() {
    // this.projectService.getProjects().subscribe(projects => this.dataSource.data = projects);
  }
}

export class ProjectDataSource extends DataSource<Project> {
  constructor(private projectService: ProjectService) {
    super();
  }

  connect(): Observable<Project[]> {
    return this.projectService.getProjects();
  }

  disconnect() {}
}
