import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuardLogoutService } from './modules/users/guards/auth-guard-logout.service';
import { LoginFormComponent } from './modules/shared/components/login-form/login-form.component';

const appRoutes: Routes = [
  {
    path: "login",
    component: LoginFormComponent,
    canActivate: [AuthGuardLogoutService]
  },
  // { path: "app/tariff-plans", component: TariffPlansComponent },
  {
    path: "portals",
    loadChildren: "./modules/portal/portal.module#PortalModule"
 }, 
  // { path: "app/confirmUser", component: ConfirmPasswordComponent },
  {
    path: "", 
    redirectTo: 'login',
    pathMatch: "full"
  },
  // { path: '**', component: PageNotFoundComponent } 
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
