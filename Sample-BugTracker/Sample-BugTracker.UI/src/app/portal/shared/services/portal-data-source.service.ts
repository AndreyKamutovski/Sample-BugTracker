import { Injectable } from '@angular/core';
import { Portal } from '../shared/models/portal.model';
import { PortalService } from './portal.service';

@Injectable()
export class PortalDataSourceService {
  
  private portals: Portal[] = [];
  get Portals(): Portal[] {
    return this.portals;
  }

  constructor(private portalService: PortalService) { }

  public getUserPortals() {
    return this.portalService.getUserPortals().toPromise().then(res => {
      this.portals = res;
    });
  }

  public saveInSessionStorage(portalId: string): void {
    sessionStorage.setItem('portalID', portalId);    
  }
}
