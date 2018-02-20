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
var auth_service_1 = require("../services/auth.service");
var user_model_1 = require("../shared/models/user.model");
var router_1 = require('@angular/router');
var captcha_component_1 = require("../captcha/captcha.component");
var LoginComponent = (function () {
    function LoginComponent(authService, router) {
        this.authService = authService;
        this.router = router;
        this.user = new user_model_1.User();
    }
    LoginComponent.prototype.login = function () {
        var _this = this;
        if (this.captcha.isCaptchaChecked) {
            this.authService.login(this.user).subscribe(function (isLogin) {
                if (isLogin) {
                    _this.router.navigateByUrl('app/project');
                }
            }, function (err) {
            });
        }
    };
    LoginComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        core_1.ViewChild("captcha"), 
        __metadata('design:type', captcha_component_1.CaptchaComponent)
    ], LoginComponent.prototype, "captcha", void 0);
    LoginComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-login',
            templateUrl: 'login.component.html',
            providers: [auth_service_1.AuthService, { provide: auth_service_1.REST_URI, useValue: "http://" + location.hostname + ":2038/" }]
        }), 
        __metadata('design:paramtypes', [auth_service_1.AuthService, router_1.Router])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map