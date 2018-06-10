import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AuthService } from '../../../shared/services/auth.service';
import { ProjectService } from '../../../shared/services/project.service';
import { UsersService } from '../../../shared/services/users.service';
import { Project } from '../../models/project.model';
import { ErrorListSharedService } from '../../../shared/services/error-list-shared.service';
import { MediaMatcher } from '@angular/cdk/layout';
import { SharedDataService } from '../../../shared/services/shared-data.service';

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

  contentHeight: number;
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  onResize(event) {
    // this.contentHeight = screen.height -70; 
    this.contentHeight = window.innerHeight - 64;
  }


  routerLinkProjectsAdaptive: string; 

  constructor(
     public _route: ActivatedRoute,
     public userService: UsersService,
     public authService: AuthService,
     public errorListSharedService: ErrorListSharedService,
     media: MediaMatcher,
     changeDetectorRef: ChangeDetectorRef,   
     private sharedDataService:SharedDataService,
     
  ) {
    // this.routerLinkProjectsAdaptive = `/portals/${sessionStorage.getItem('portalTitle')}/projects`;
    this.routerLinkProjectsAdaptive = `/portals/${this.sharedDataService.PortalTitle}/projects`;
    this.errorListSharedService.Errors = this._route.snapshot.data.errorList;
    this.errorListSharedService.ProjectWorkers = this._route.snapshot.data.projectWorkers;
    this.errorListSharedService.ProjectUsers = this._route.snapshot.data.userList;
    this.errorListSharedService.Project = this._route.snapshot.data.currentProject;
    this.onResize(event);

    this.mobileQuery = media.matchMedia('(max-width: 1277px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

   }

  ngOnInit() {
    // let projectID = this._route.snapshot.params['id'];
    // console.log('SelectedProjectPageComponent init -> id', );
    // sessionStorage.setItem('projectID', projectID);
  }
}
