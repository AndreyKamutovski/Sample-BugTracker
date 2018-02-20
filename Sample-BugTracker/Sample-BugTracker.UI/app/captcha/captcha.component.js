"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var angular2_recaptcha_1 = require('angular2-recaptcha');
var CaptchaComponent = (function () {
    function CaptchaComponent() {
        this._isCaptchaChecked = false;
    }
    Object.defineProperty(CaptchaComponent.prototype, "isCaptchaChecked", {
        get: function () {
            return this._isCaptchaChecked;
        },
        enumerable: true,
        configurable: true
    });
    CaptchaComponent.prototype.handleCorrectCaptcha = function (responseToken) {
        this._isCaptchaChecked = true;
    };
    CaptchaComponent.prototype.handleExpiredCaptcha = function () {
        this._isCaptchaChecked = false;
        this.captcha.reset();
    };
    __decorate([
        core_1.ViewChild(angular2_recaptcha_1.ReCaptchaComponent), 
        __metadata('design:type', angular2_recaptcha_1.ReCaptchaComponent)
    ], CaptchaComponent.prototype, "captcha", void 0);
    CaptchaComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-captcha',
            templateUrl: 'captcha.component.html'
        }), 
        __metadata('design:paramtypes', [])
    ], CaptchaComponent);
    return CaptchaComponent;
}());
exports.CaptchaComponent = CaptchaComponent;
//# sourceMappingURL=captcha.component.js.map