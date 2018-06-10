import { Injectable } from '@angular/core';
import { StatusList } from '../../errors/enums/status-list.enum';
import { Observable } from 'rxjs/Observable';
import { RequestMethod } from '@angular/http';
import { HttpClientService } from '../../shared/services/httpClient.service';
import { TopUser } from '../models/top-user.model';
import { DelayError } from '../models/delay-error.model';
import { TeamStateItem } from '../models/team-state-item.model';
import { OverviewWork } from '../models/overview-work.model';
import { MyError } from '../models/my-error.model';

@Injectable()
export class StatisticsService {

  private readonly routerPrefix: string = "api/statistics";

  constructor(private HttpClientService: HttpClientService) { }

  getTopUsers(projectId: number): Observable<TopUser[]> {
    return this.HttpClientService.sendRequest(RequestMethod.Get, `${this.routerPrefix}/TopUsers`, { 'projectId': projectId });
  }

  getDelayErrors(projectId: number): Observable<DelayError[]> {
    return this.HttpClientService.sendRequest(RequestMethod.Get, `${this.routerPrefix}/DelayErrors`, { 'projectId': projectId });
  }

  getTeamStates(projectId: number): Observable<TeamStateItem[]> {
    return this.HttpClientService.sendRequest(RequestMethod.Get, `${this.routerPrefix}/TeamState`, { 'projectId': projectId });
  }

  // main page
  getOverviewMyWork(portalId: string): Observable<OverviewWork> {
    return this.HttpClientService.sendRequest(RequestMethod.Get, `${this.routerPrefix}/MyWorkReport`, { 'portalId': portalId });
  }

  getMyErrors(portalId: string): Observable<MyError[]> {
    return this.HttpClientService.sendRequest(RequestMethod.Get, `${this.routerPrefix}/MyErrorReport`, { 'portalId': portalId });
  }

    getMyErrorsToday(portalId: string): Observable<MyError[]> {
    return this.HttpClientService.sendRequest(RequestMethod.Get, `${this.routerPrefix}/MyErrorReportToday`, { 'portalId': portalId });
  }

  getMyDelayErrors(portalId: string): Observable<MyError[]> {
    return this.HttpClientService.sendRequest(RequestMethod.Get, `${this.routerPrefix}/MyErrorDelayReport`, { 'portalId': portalId });
  }
}
