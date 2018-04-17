import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Project } from '../../models/project.model';
import { ProjectService } from '../../project.service';
import { UsersService } from '../../../users/users.service';
import { AuthService } from '../../../../shared/services/auth.service';



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

  private sidenavNavElements: sidenavNavElement[] = [
    { title: "Информационная панель", matIcon: "info", link: "dashboard" },
    { title: "Ошибки", matIcon: "bug_report", link: "errors" },
    { title: "Пользователи", matIcon: "people", link: "users" }
  ];

  constructor(
    private _route: ActivatedRoute,
    private userService: UsersService,
    private authService: AuthService
    
  ) { }

  ngOnInit() {
    // let projectID = this._route.snapshot.params['id'];
    // console.log('SelectedProjectPageComponent init -> id', );
    // sessionStorage.setItem('projectID', projectID);
  }
}
