import { Component, OnInit } from '@angular/core';
import { ProjectDataSourceService } from '../services/project-data-source.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  constructor(
    private projectDSource: ProjectDataSourceService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.projectDSource.pullCurrentProject();
  }

}
