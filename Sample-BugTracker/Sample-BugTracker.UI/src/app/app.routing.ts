import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './modules/dashboard/components/dashboard/dashboard.component';
import { ErrorListComponent } from './modules/errors/components/error-list/error-list.component';
import { ErrorListResolverService } from './modules/errors/resolvers/error-list-resolver.service';
import { PortalListComponent } from './modules/portal/components/portal-list/portal-list.component';
import { TariffPlansComponent } from './modules/portal/components/tariff-plans/tariff-plans.component';
import { IsPortalOwnerService } from './modules/portal/resolvers/is-portal-owner.service';
import { PortalListResolverService } from './modules/portal/resolvers/portal-list-resolver.service';
import { ProjectListComponent } from './modules/projects/components/project-list/project-list.component';
import {
    SelectedProjectPageComponent,
} from './modules/projects/components/selected-project-page/selected-project-page.component';
import { AuthGuardLoginService } from './modules/projects/guards/auth-guard-login.service';
import { CurrentProjectResolverService } from './modules/projects/resolvers/current-project-resolver.service';
import { ProjectListResolverService } from './modules/projects/resolvers/project-list-resolver.service';
import { ConfirmPasswordComponent } from './modules/users/components/confirm-password/confirm-password.component';
import { LoginFormComponent } from './modules/users/components/login-form/login-form.component';
import { UserListComponent } from './modules/users/components/user-list/user-list.component';
import { AuthGuardLogoutService } from './modules/users/guards/auth-guard-logout.service';
import { ProjectOwnerResolverService } from './modules/users/resolvers/project-owner-resolver.service';
import { UserListResolverService } from './modules/users/resolvers/user-list-resolver.service';


// { path: '', component: ProjectListComponent, resolve: { projectList: ProjectListResolverService } },


const routes: Routes = [
    { path: "", component: LoginFormComponent, canActivate: [AuthGuardLogoutService] },
        {
        path: "app/project", component: SelectedProjectPageComponent, canActivate: [AuthGuardLoginService],
        canActivateChild: [AuthGuardLoginService],
        children: [
            { path: 'dashboard', component: DashboardComponent, resolve: { currentProject: CurrentProjectResolverService, projectOwner: ProjectOwnerResolverService }, },
            { path: 'errors', component: ErrorListComponent, resolve: {errorList: ErrorListResolverService} },
            { path: 'users', component: UserListComponent, resolve: { userList: UserListResolverService }, }
        ]
    },
    { path: "app/projects", component: ProjectListComponent, canActivate: [AuthGuardLoginService], resolve: { projectList: ProjectListResolverService, isPortalOwner: IsPortalOwnerService } },
    { path: "app/tariff-plans", component: TariffPlansComponent },
    { path: "app/portals", component: PortalListComponent, canActivate: [AuthGuardLoginService], resolve: { portals: PortalListResolverService } },
    { path: "app/confirmUser", component: ConfirmPasswordComponent }
]

export const routing = RouterModule.forRoot(routes);