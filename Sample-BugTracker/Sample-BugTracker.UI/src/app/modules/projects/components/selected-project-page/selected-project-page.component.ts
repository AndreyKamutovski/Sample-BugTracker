import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AuthService } from '../../../shared/services/auth.service';
import { ProjectService } from '../../../shared/services/project.service';
import { UsersService } from '../../../shared/services/users.service';
import { Project } from '../../models/project.model';

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

  sidenavNavElements: sidenavNavElement[] = [
    { title: "Информационная панель", matIcon: "info", link: "dashboard" },
    { title: "Ошибки", matIcon: "bug_report", link: "errors" },
    { title: "Пользователи", matIcon: "people", link: "users" }
  ];

  constructor(
     public _route: ActivatedRoute,
     public userService: UsersService,
     public authService: AuthService
    
  ) { }

  ngOnInit() {
    // let projectID = this._route.snapshot.params['id'];
    // console.log('SelectedProjectPageComponent init -> id', );
    // sessionStorage.setItem('projectID', projectID);
  }
}
