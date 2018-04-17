import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../../../projects/models/project.model';
import { User } from '../../../users/models/user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  private _project: Project;
  private _projectOwner: User;

  constructor(
    private _route: ActivatedRoute
  ) {
    this._project = this._route.snapshot.data.currentProject;
    this._projectOwner = this._route.snapshot.data.projectOwner;
  }

  ngOnInit() {
  }
}
