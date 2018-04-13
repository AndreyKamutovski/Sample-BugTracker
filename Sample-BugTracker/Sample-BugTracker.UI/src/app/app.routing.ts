import { RouterModule, Routes } from '@angular/router';

import { ConfirmPasswordComponent } from './confirm-password/confirm-password.component';
import { LoginComponent } from './login/login.component';
import { PortalListResolverService } from './portal/portal-list-resolver.service';
import { PortalListComponent } from './portal/portal-list/portal-list.component';
import { TariffPlansComponent } from './portal/tariff-plans/tariff-plans.component';
import { DashboardComponent } from './projects/dashboard/dashboard.component';
import { ProjectListResolverService } from './projects/project-list/project-list-resolver.service';
import { ProjectListComponent } from './projects/project-list/project-list.component';
import { ProjectsComponent } from './projects/projects.component';
import { SelectedProjectPageComponent } from './projects/selected-project-page/selected-project-page.component';
import { UserListComponent } from './projects/user-list/user-list.component';
import { AuthGuardLoginService } from './services/auth-guard-login.service';
import { AuthGuardLogoutService } from './services/auth-guard-logout.service';
import { ErrorListComponent } from './errors/error-list/error-list.component';



const routes: Routes = [
    { path: "", component: LoginComponent, canActivate: [AuthGuardLogoutService] },
    {
        path: "app/project", component: ProjectsComponent, canActivate: [AuthGuardLoginService],
        children: [
            { path: '', component: ProjectListComponent, resolve: { projectList: ProjectListResolverService } },
            {
                path: ':id', component: SelectedProjectPageComponent,
                children: [
                    { path: 'dashboard', component: DashboardComponent },
                    { path: 'errors', component: ErrorListComponent },
                    { path: 'users', component: UserListComponent }
                ]
            }
        ]
    },
    { path: "app/tariff-plans", component: TariffPlansComponent },
    { path: "app/portals", component: PortalListComponent, canActivate: [AuthGuardLoginService], resolve: { portals: PortalListResolverService } },
    { path: "app/confirmUser", component: ConfirmPasswordComponent }
]

export const routing = RouterModule.forRoot(routes);