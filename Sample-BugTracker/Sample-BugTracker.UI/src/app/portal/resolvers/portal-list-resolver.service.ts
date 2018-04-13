import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Portal } from '../shared/models/portal.model';
import { PortalDataSourceService } from './portal-data-source.service';
import { LoaderService } from '../loader/loader.service';

@Injectable()
export class PortalListResolverService {

  constructor(private portalDataSource: PortalDataSourceService) { }

  resolve(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<void> {
      return this.portalDataSource.getUserPortals();
    // return this.portalDataSource.Portals.length == 0
    //   ? this.portalDataSource.getUserPortals() : null;
  }
}
