import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../../../projects/models/project.model';
import { User } from '../../../users/models/user.model';
import { DiagramTypes } from '../../enums/diagram-types';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  project: Project;
  projectOwner: User;
  diagramType: DiagramTypes;
  dataDiagram;
  diagramTypes = DiagramTypes;

  constructor(
    private _route: ActivatedRoute
  ) {
    this.project = this._route.snapshot.data.currentProject;
    this.projectOwner = this._route.snapshot.data.projectOwner;
  }

  ngOnInit() {
    this.dataDiagram = {
      labels: ['Статус'],
      datasets: [
        {
          label: 'Открыто',
          backgroundColor: '#42A5F5',
          borderColor: '#1E88E5',
          data: [this.project.ErrorStatistics.OpenErrorCount]
        },
        {
          label: 'Закрыто',
          backgroundColor: '#9CCC65',
          borderColor: '#7CB342',
          data: [this.project.ErrorStatistics.ClosedErrorCount]
        }
      ]
    }
  }
}
