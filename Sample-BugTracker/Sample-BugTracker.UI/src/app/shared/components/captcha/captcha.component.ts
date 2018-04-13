import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-captcha',
  templateUrl: './captcha.component.html',
  styles: []
})
export class CaptchaComponent implements OnInit {

  @ViewChild(ReCaptchaComponent) private captcha: ReCaptchaComponent;
  private _isCaptchaChecked: boolean = false;

  public get isCaptchaChecked(): boolean {
      return this._isCaptchaChecked;
  }

  private handleCorrectCaptcha(responseToken: string) {
      this._isCaptchaChecked = true;
  }

  private handleExpiredCaptcha() {
      this._isCaptchaChecked = false;
      this.captcha.reset();
  }
}
