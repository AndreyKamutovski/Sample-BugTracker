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
var platform_browser_1 = require('@angular/platform-browser');
var app_component_1 = require('./app.component');
var forms_1 = require('@angular/forms');
var login_component_1 = require('./login/login.component');
var app_routing_1 = require('./app.routing');
var http_1 = require("@angular/http");
var auth_service_1 = require("./services/auth.service");
var captcha_component_1 = require('./captcha/captcha.component');
var angular2_recaptcha_1 = require('angular2-recaptcha');
var project_component_1 = require("./project/project.component");
var message_module_1 = require("./messages/message.module");
var message_component_1 = require("./messages/message.component");
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, forms_1.FormsModule, http_1.HttpModule, app_routing_1.routing, angular2_recaptcha_1.ReCaptchaModule, message_module_1.MessageModule],
            declarations: [
                app_component_1.AppComponent,
                login_component_1.LoginComponent,
                captcha_component_1.CaptchaComponent,
                project_component_1.ProjectComponent
            ],
            providers: [auth_service_1.AuthService, { provide: auth_service_1.REST_URI, useValue: 'http://${location.hostname}:2038/' }],
            bootstrap: [app_component_1.AppComponent, message_component_1.MessageComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map