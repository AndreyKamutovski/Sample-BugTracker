import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuardLogoutService } from './modules/users/guards/auth-guard-logout.service';
import { LoginFormComponent } from './modules/shared/components/login-form/login-form.component';
import { ConfirmPasswordComponent } from './modules/users/components/confirm-password/confirm-password.component';
import { AuthGuard } from './modules/projects/guards/auth-guard-login.service';

const appRoutes: Routes = [
  {
    path: "login",
    component: LoginFormComponent,
    canActivate: [AuthGuardLogoutService]
  },
  {
    path: "portals",
    loadChildren: "./modules/portal/portal.module#PortalModule"
  },
  {
    path: "portals/:portalName",
    loadChildren: "./modules/dashboard/dashboard.module#DashboardModule",
    canLoad: [AuthGuard]
  },
  {
    path: "confirmUser",
    loadChildren: "./modules/users/users.module#UsersModule"
  },
  {
    path: "",
    redirectTo: 'login',
    pathMatch: "full"
  },
  // { path: "confirmUser", component: ConfirmPasswordComponent },
];

// { path: '**', component: PageNotFoundComponent } 
// { path: "app/confirmUser", component: ConfirmPasswordComponent },
// { path: "app/tariff-plans", component: TariffPlansComponent },

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
