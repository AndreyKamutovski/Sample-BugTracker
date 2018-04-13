import { Injectable } from '@angular/core';

@Injectable()
export class LoaderService {

  private _isLoading: boolean = true;
  public get isLoading(): boolean {
    return this._isLoading;
  }

  constructor() { }

  public show(): void {
    this._isLoading = true;
  }

  public hide(): void {
    this._isLoading = false;
  }
}
