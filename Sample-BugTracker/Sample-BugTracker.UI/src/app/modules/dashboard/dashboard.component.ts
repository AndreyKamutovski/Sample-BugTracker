import { Component, OnInit } from '@angular/core';

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
