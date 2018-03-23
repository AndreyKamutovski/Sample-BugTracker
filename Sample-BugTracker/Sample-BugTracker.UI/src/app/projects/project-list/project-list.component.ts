import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

import { Project } from '../shared/project.model';
import { ProjectService } from '../shared/project.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styles: []
})
export class ProjectListComponent implements OnInit {

  displayedColumns = ['title', 'countError', 'dateStart', 'dateEnd'];
  public dataSource: MatTableDataSource<Project> = new MatTableDataSource<Project>();

  constructor(private projectService: ProjectService) { }

  ngOnInit() {
    this.projectService.getProjects().subscribe(projects => this.dataSource.data = projects);
  }

}
