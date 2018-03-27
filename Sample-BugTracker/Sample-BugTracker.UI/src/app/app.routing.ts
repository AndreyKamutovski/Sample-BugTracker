import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { ProjectsComponent } from './projects/projects.component';
import { AuthGuardLoginService } from './services/auth-guard-login.service';
import { ProjectListComponent } from './projects/project-list/project-list.component';
import { SelectedProjectPageComponent } from './projects/selected-project-page/selected-project-page.component';


const routes: Routes = [
    { path: "", component: LoginComponent },
    {
        path: "app/project", component: ProjectsComponent, canActivate: [AuthGuardLoginService],
        children: [
            { path: '', component: ProjectListComponent },
            { path: 'description/:id', component: SelectedProjectPageComponent }
        ]
    }
]

export const routing = RouterModule.forRoot(routes);