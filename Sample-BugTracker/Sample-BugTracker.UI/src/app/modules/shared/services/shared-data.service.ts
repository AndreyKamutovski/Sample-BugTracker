import { Injectable } from '@angular/core';

@Injectable()
export class SharedDataService {

  private _portalId: string;
  private _portalTitle: string;

  set PortalId(value) {
    this._portalId = value;
  }
  get PortalId():string {
    return this._portalId;
  }

  set PortalTitle(value) {
    this._portalTitle = value;
  }
  get PortalTitle():string {
    return this._portalTitle;
  }

  constructor() { }

}
