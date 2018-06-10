import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { StatisticsService } from '../services/statistics.service';
import { SharedDataService } from '../../shared/services/shared-data.service';
import { OverviewWork } from '../models/overview-work.model';

@Injectable()
export class MyWorkResolverService {

  constructor(
    private statistics: StatisticsService,
    private sharedDataService:SharedDataService,
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.statistics.getOverviewMyWork(this.sharedDataService.PortalId);
  }
}
