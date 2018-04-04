import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { ProjectsComponent } from './projects/projects.component';
import { AuthGuardLoginService } from './services/auth-guard-login.service';
import { ProjectListComponent } from './projects/project-list/project-list.component';
import { SelectedProjectPageComponent } from './projects/selected-project-page/selected-project-page.component';
import { TariffPlansComponent } from './portal/tariff-plans/tariff-plans.component';
import { DashboardComponent } from './projects/dashboard/dashboard.component';
import { ErrorsComponent } from './projects/errors/errors.component';
import { UserListComponent } from './projects/user-list/user-list.component';



const routes: Routes = [
    { path: "", component: LoginComponent },
    {
        path: "app/project", component: ProjectsComponent, canActivate: [AuthGuardLoginService],
        children: [
            { path: '', component: ProjectListComponent },
            {
                 path: ':id', component: SelectedProjectPageComponent,
                 children: [
                     {path: 'dashboard', component: DashboardComponent},
                     {path: 'errors', component: ErrorsComponent},
                     {path: 'users', component: UserListComponent}
                 ]
            }
        ]
    },
    { path: "app/tariff-plans", component: TariffPlansComponent },
]

export const routing = RouterModule.forRoot(routes);