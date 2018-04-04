import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Project } from '../shared/project.model';
import { ProjectService } from '../shared/project.service';

interface sidenavNavElement {
  title: string;
  matIcon: string;
  link: string;
}

@Component({
  selector: 'app-selected-project-page',
  templateUrl: './selected-project-page.component.html',
  styleUrls: ['./selected-project-page.component.css']
})
export class SelectedProjectPageComponent implements OnInit {
  private project: Project = new Project();
  private sidenavNavElements: sidenavNavElement[] = [
    { title: "Информационная панель", matIcon: "info", link: "dashboard" },
    { title: "Ошибки", matIcon: "bug_report", link: "errors" },
    { title: "Пользователи", matIcon: "people", link: "users" },
  ];


  constructor(private _route: ActivatedRoute, private projectService: ProjectService) { }

  ngOnInit() {
    let projectID = this._route.snapshot.params['id'];
    this.projectService.getProjectById(projectID).subscribe(res => this.project = res);
  }
}
