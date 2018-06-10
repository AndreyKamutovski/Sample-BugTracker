import { Injectable } from '@angular/core';
import { StatusList } from '../../errors/enums/status-list.enum';

@Injectable()
export class StatisticsRoutingService {

  private _openClosedDiagram: StatusList;
  public isFromDiagram: boolean = false;

  constructor() { }

  get openClosedDiagram() {
    return this._openClosedDiagram;
  }

  set openClosedDiagram(value) {
    this._openClosedDiagram = value;
  }


}
