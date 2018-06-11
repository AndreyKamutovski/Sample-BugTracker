import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

import {
  SelectedErrorDialogComponent,
} from '../../../errors/components/selected-error-dialog/selected-error-dialog.component';
import { StatusList } from '../../../errors/enums/status-list.enum';
import { ErrorService } from '../../../errors/services/error.service';
import { Project } from '../../../projects/models/project.model';
import { StatisticsRoutingService } from '../../../shared/services/statistics-routing.service';
import { UsersService } from '../../../shared/services/users.service';
import { User } from '../../../users/models/user.model';
import { DiagramTypes } from '../../enums/diagram-types';
import { DelayError } from '../../models/delay-error.model';
import { TeamStateItem } from '../../models/team-state-item.model';
import { TopUser } from '../../models/top-user.model';
import { StatisticsService } from '../../services/statistics.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['../../statistics.css']
})
export class DashboardComponent implements OnInit {

  project: Project;
  projectOwner: User;
  diagramType: DiagramTypes;
  dataBarDiagram;
  dataPieDonutDiagram;
  diagramTypes = DiagramTypes;

  notAvatarProxy: string = '../../../../../assets/person.png';

  isEmptyErrorState(): boolean {
    return this.project.ErrorStatistics.OpenErrorCount == 0 && this.project.ErrorStatistics.ClosedErrorCount == 0;
  }

  openColor: string = '#9CCC65';
  closedColor: string = '#42A5F5';

  optionsDiagrams = {
    legend: {
      position: 'bottom'
    }
  };

  // data sets
  topUsers: TopUser[] = [];
  delayErrors: DelayError[] = [];
  teamStates: TeamStateItem[] = [];

  // loaders
  isLoadTopUsers: boolean = false;
  isLoadDelayErrors: boolean = false;
  isLoadTeamState: boolean = false;

  constructor(
    private _route: ActivatedRoute,
    public router: Router,
    private _statisticRouting: StatisticsRoutingService,
    private statistics: StatisticsService,
    private userSrv: UsersService,
    public dialog: MatDialog,
    public errorService: ErrorService,
  ) {
    this.project = this._route.snapshot.data.currentProject;
    this.projectOwner = this._route.snapshot.data.projectOwner;
  }

  ngOnInit() {
    this.dataBarDiagram = {
      datasets: [
        {
          label: 'Открыто',
          backgroundColor: this.openColor,
          borderColor: '#1E88E5',
          data: [this.project.ErrorStatistics.OpenErrorCount]
        },
        {
          label: 'Закрыто',
          backgroundColor: this.closedColor,
          borderColor: '#7CB342',
          data: [this.project.ErrorStatistics.ClosedErrorCount]
        }
      ]
    };

    this.dataPieDonutDiagram = {
      labels: ['Открыто', 'Закрыто'],
      datasets: [
        {
          data: [this.project.ErrorStatistics.OpenErrorCount, this.project.ErrorStatistics.ClosedErrorCount],
          backgroundColor: [
            this.openColor,
            this.closedColor
          ],
          hoverBackgroundColor: [
            this.openColor,
            this.closedColor
          ]
        }]
    };

    // top
    this.isLoadTopUsers = true;
    this.statistics.getTopUsers(this.project.ProjectId).toPromise().then(t => {
      this.topUsers = t;
      this.isLoadTopUsers = false;
    });

    // delay error
    this.isLoadDelayErrors = true;
    this.statistics.getDelayErrors(this.project.ProjectId).toPromise().then(delayErrors => {
      this.delayErrors = delayErrors;
      this.isLoadDelayErrors = false;
    });

    // team state
    this.isLoadTeamState = true;
    this.statistics.getTeamStates(this.project.ProjectId).toPromise().then(teamStates => {
      this.teamStates = teamStates;
      this.isLoadTeamState = false;
    });

  }

  selectChart(event) {
    // event._datasetIndex;
    if (event.element._datasetIndex == 0) {
      this._statisticRouting.openClosedDiagram = StatusList.OPEN;
    }
    else {
      if (event.element._datasetIndex == 1) {
        this._statisticRouting.openClosedDiagram = StatusList.CLOSED;
      }
    }
    this._statisticRouting.isFromDiagram = true;
    this.router.navigate(['../errors'], { relativeTo: this._route.parent });
  }

  openEditErrorDialog(errorId: number): void {
    this.errorService.get(errorId).toPromise().then(e => {

      let dialogRef = this.dialog.open(SelectedErrorDialogComponent, {
        width: '95%',
        maxWidth: '95%',
        height: '95%',
        maxHeight: '95%',
        disableClose: true,
        data: { 'error': e }
      });
    });
  }
}
