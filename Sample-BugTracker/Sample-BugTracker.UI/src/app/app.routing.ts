// import { RouterModule, Routes } from '@angular/router';

// import { DashboardComponent } from './modules/dashboard/components/dashboard/dashboard.component';
// import { ErrorListComponent } from './modules/errors/components/error-list/error-list.component';
// import { ErrorListResolverService } from './modules/errors/resolvers/error-list-resolver.service';
// import { PortalListComponent } from './modules/portal/components/portal-list/portal-list.component';
// import { TariffPlansComponent } from './modules/portal/components/tariff-plans/tariff-plans.component';
// import { IsPortalOwnerService } from './modules/portal/resolvers/is-portal-owner.service';
// import { PortalListResolverService } from './modules/portal/resolvers/portal-list-resolver.service';
// import { ProjectListComponent } from './modules/projects/components/project-list/project-list.component';
// import {
//     SelectedProjectPageComponent,
// } from './modules/projects/components/selected-project-page/selected-project-page.component';
// import { AuthGuard } from './modules/projects/guards/auth-guard-login.service';
// import { CurrentProjectResolverService } from './modules/projects/resolvers/current-project-resolver.service';
// import { ProjectListResolverService } from './modules/projects/resolvers/project-list-resolver.service';
// import { ProjectPermissionResolverService } from './modules/projects/resolvers/project-permission-resolver.service';
// import { ConfirmPasswordComponent } from './modules/users/components/confirm-password/confirm-password.component';
// import { LoginFormComponent } from './modules/users/components/login-form/login-form.component';
// import { UserListComponent } from './modules/users/components/user-list/user-list.component';
// import { AuthGuardLogoutService } from './modules/users/guards/auth-guard-logout.service';
// import { ProjectOwnerResolverService } from './modules/users/resolvers/project-owner-resolver.service';
// import { ProjectWorkersResolver } from './modules/users/resolvers/project-workers-resolver.service';
// import { UserListResolver } from './modules/users/resolvers/user-list-resolver.service';
// import { ErrorAttachmentsComponent } from './modules/errors/components/error-attachments/error-attachments.component';


// // { path: '', component: ProjectListComponent, resolve: { projectList: ProjectListResolverService } },


// const routes: Routes = [
//     { path: "", component: LoginFormComponent, canActivate: [AuthGuardLogoutService] },
//     {
//         path: "app/project", component: SelectedProjectPageComponent, canActivate: [AuthGuard],
//         canActivateChild: [AuthGuard],
//         children: [
//             { path: 'dashboard', component: DashboardComponent, resolve: { currentProject: CurrentProjectResolverService, projectOwner: ProjectOwnerResolverService, projectPerm: ProjectPermissionResolverService }, },
//             {
//                 path: 'errors',
//                 component: ErrorListComponent,
//                 resolve: { errorList: ErrorListResolverService, projectWorkers: ProjectWorkersResolver, userList: UserListResolver, currentProject: CurrentProjectResolverService },
//                 children: [
//                     { path: '/:id/attachments', component: ErrorAttachmentsComponent }
//                 ]
//             },
//             { path: 'users', component: UserListComponent, resolve: { userList: UserListResolver }, }
//         ]
//     },
//     // { path: "app/projects", component: ProjectListComponent, canActivate: [AuthGuard], resolve: { projectList: ProjectListResolverService, isPortalOwner: IsPortalOwnerService } },
//     // { path: "app/tariff-plans", component: TariffPlansComponent },
//     // { path: "app/portals", component: PortalListComponent, canActivate: [AuthGuard], resolve: { portals: PortalListResolverService } },
//     // { path: "app/confirmUser", component: ConfirmPasswordComponent }
// ]

// export const routing = RouterModule.forRoot(routes);