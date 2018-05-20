import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../../../projects/models/project.model';
import { User } from '../../../users/models/user.model';

enum diagramTypes {
  Bar = 1,
  Pie,
  Donut
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  public _project: Project;
  public _projectOwner: User;
  public _diagramType: diagramTypes;
  public _dataDiagram;
public diagramTypes = diagramTypes;
  constructor(
    private _route: ActivatedRoute
  ) {
    this._project = this._route.snapshot.data.currentProject;
    this._projectOwner = this._route.snapshot.data.projectOwner;
  }

  ngOnInit() {
    this._dataDiagram = {
      labels: ['Открыто', 'Закрыто'],
      datasets: [
        {
          label: 'Открыто',
          backgroundColor: '#42A5F5',
          borderColor: '#1E88E5',
          data: [this._project.ErrorStatistics.OpenErrorCount]
        },
        {
          label: 'Закрыто',
          backgroundColor: '#9CCC65',
          borderColor: '#7CB342',
          data: [this._project.ErrorStatistics.ClosedErrorCount]
        }
      ]
    }
  }
}
