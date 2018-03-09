import { Component, ViewChild } from '@angular/core';
import { ReCaptchaComponent } from 'angular2-recaptcha';

@Component({
    moduleId: module.id,
    selector: 'app-captcha',
    templateUrl: 'captcha.component.html'
})
export class CaptchaComponent {
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