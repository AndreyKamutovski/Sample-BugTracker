import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../shared/project.model';
import { ProjectService } from '../shared/project.service';

interface sidenavElement {
  title: string;
matIcon:string;
}

@Component({
  selector: 'app-selected-project-page',
  templateUrl: './selected-project-page.component.html',
  styles: []
})
export class SelectedProjectPageComponent implements OnInit {
  private project: Project = new Project();
private sidenavElements: sidenavElement[] = [
  {title: "Информационная панель", matIcon: "info"},
  {title: "Ошибки", matIcon: "error"},
  {title: "Пользователи", matIcon: "person"},
  
];


  constructor(private _route: ActivatedRoute, private projectService: ProjectService) { }

  ngOnInit() {
    let projectID = this._route.snapshot.params['id'];
    this.projectService.getProjectById(projectID).subscribe(res => this.project = res);
  }
}
