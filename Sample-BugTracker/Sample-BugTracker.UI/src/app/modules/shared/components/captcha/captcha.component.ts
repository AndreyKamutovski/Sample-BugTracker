import { Component, OnInit, ViewChild } from '@angular/core';
import { ReCaptchaComponent } from 'angular2-recaptcha';

@Component({
  selector: 'app-captcha',
  templateUrl: './captcha.component.html',
  styles: []
})
export class CaptchaComponent implements OnInit {
    ngOnInit(): void {
    }

  @ViewChild(ReCaptchaComponent) private captcha: ReCaptchaComponent;
   _isCaptchaChecked: boolean = false;

  get isCaptchaChecked(): boolean {
      return this._isCaptchaChecked;
  }

   handleCorrectCaptcha(responseToken: string) {
      this._isCaptchaChecked = true;
  }

   handleExpiredCaptcha() {
      this._isCaptchaChecked = false;
      this.captcha.reset();
  }
}
