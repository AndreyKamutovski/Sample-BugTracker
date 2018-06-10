import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../projects/guards/auth-guard-login.service';
import { PortalListComponent } from './components/portal-list/portal-list.component';
import { TariffPlansComponent } from './components/tariff-plans/tariff-plans.component';
import { PortalListResolverService } from './resolvers/portal-list-resolver.service';
import { UserHavePortalResolverService } from './resolvers/user-have-portal-resolver.service';

const portalsRoutes: Routes = [
  {
    path: '',
    component: PortalListComponent,
    canActivate: [AuthGuard],
    resolve: { portals: PortalListResolverService, havePortal: UserHavePortalResolverService }
  },
  { path: "tariff-plans", component: TariffPlansComponent },
  {
    path: ":portalName/projects",
    loadChildren: "../projects/projects.module#ProjectsModule",
    canLoad: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(portalsRoutes)],
  exports: [RouterModule],
  declarations: []
})
export class PortalsRoutingModule { }
