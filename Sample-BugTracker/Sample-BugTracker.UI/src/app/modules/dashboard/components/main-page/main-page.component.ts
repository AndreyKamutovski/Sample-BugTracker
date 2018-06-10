import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UIChart } from 'primeng/components/chart/chart';

import { AuthService } from '../../../shared/services/auth.service';
import { SharedDataService } from '../../../shared/services/shared-data.service';
import { OverviewWork } from '../../models/overview-work.model';
import { StatisticsService } from '../../services/statistics.service';
import { ActivatedRoute } from '@angular/router';
import { MyError } from '../../models/my-error.model';
import * as moment from 'moment';
import { ErrorService } from '../../../errors/services/error.service';
import { SelectedErrorDialogComponent } from '../../../errors/components/selected-error-dialog/selected-error-dialog.component';
import { MatDialog } from '@angular/material';
import { ErrorListSharedService } from '../../../shared/services/error-list-shared.service';
import { ErrorBT } from '../../../errors/models/error.model';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['../../statistics.css']
})
export class MainPageComponent implements OnInit {

  optionsDiagrams = {
    legend: {
      position: 'bottom'
    }
  };

  portalName: string = this.sharedDataService.PortalTitle;

     @ViewChild('divOverview') divOverviewRef: ElementRef;

  // isLoader's
  isLoadMyErrors: boolean = false;
  isLoadMyErrorsToday: boolean = false;
  isLoadMyDelayErrors: boolean = false;

  // date
  dataMyWorkOverview: any;
  myErrors: MyError[] = [];
  myErrorsToday: MyError[] = [];
  myDelayErrors: MyError[] = [];

  // colors
  openColor: string = '#9CCC65';
  closedColor: string = '#42A5F5';

  // workOverview
  myWorkOverview: OverviewWork = new OverviewWork();


  statisticsContainerHeight: number;

  onResize(event) {
    this.statisticsContainerHeight = window.innerHeight - 64;
  }


  

  constructor(
    private _route: ActivatedRoute,
    public authService: AuthService,
    private statistics: StatisticsService,
    private sharedDataService: SharedDataService,
    public dialog: MatDialog,
    public errorService: ErrorService,
    public errorListSharedService: ErrorListSharedService

  ) {
    this.myWorkOverview = this._route.snapshot.data.OverviewMyWork;
    this.onResize(event);
  }


  getColorDeadline(utcDate: Date): string {
    let now = moment().local().startOf('day');
    let localDateDeadline = moment.utc(utcDate).local().startOf('day');
    if (localDateDeadline > now) return 'success-color';
    else {
      if (localDateDeadline < now) return 'warn-color';
    }
    return '';
  }

  openEditErrorDialog(errorId: number, projectName: string): void {
    this.errorService.get(errorId).toPromise().then(e => {
      this.errorListSharedService.Project.Title = projectName;
      let dialogRef = this.dialog.open(SelectedErrorDialogComponent, {
        width: '95%',
        maxWidth: '95%',
        height: '95%',
        maxHeight: '95%',
        disableClose: true,
        data: { 'error': e }
      });
      dialogRef.afterClosed().toPromise().then((e: ErrorBT) => {
        let index = this.myErrors.findIndex(err => err.Id == e.ErrorId);
        if (index > -1) {
          let myError = this.myErrors[index];
          myError.Title = e.Title;
          myError.Deadline = e.Deadline;
          this.myErrors[index] = myError;
        }
      });
    });
  }

  ngOnInit() {
    // overview my work
    this.dataMyWorkOverview = {
      labels: ['Открыто', 'Закрыто'],
      datasets: [
        {
          data: [this.myWorkOverview.OpenErrorCount, this.myWorkOverview.ClosedErrorCount],
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

    // my errors
    this.isLoadMyErrors = true;
    this.statistics.getMyErrors(this.sharedDataService.PortalId).toPromise().then(errors => {
      this.myErrors = errors;
      this.isLoadMyErrors = false;
    });

    // my errors today
    this.isLoadMyErrorsToday = true;
    this.statistics.getMyErrorsToday(this.sharedDataService.PortalId).toPromise().then(errors => {
      this.myErrorsToday = errors;
      this.isLoadMyErrorsToday = false;
    });

    // my errors delay
    this.isLoadMyDelayErrors = true;
    this.statistics.getMyDelayErrors(this.sharedDataService.PortalId).toPromise().then(errors => {
      this.myDelayErrors = errors;
      this.isLoadMyDelayErrors = false;
    });
  }


  isEmptyMyWorkOverview() {
    return this.myWorkOverview.OpenErrorCount == 0 && this.myWorkOverview.ClosedErrorCount == 0;

  }
}
