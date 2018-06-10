import { NgModule } from '@angular/core';

import { SharedModule } from './../shared/shared.module';
import {
  AddPortalForExistingUserComponent,
} from './components/add-portal-for-existing-user/add-portal-for-existing-user.component';
import { AddPortalFormComponent } from './components/add-portal-form/add-portal-form.component';
import { PortalListComponent } from './components/portal-list/portal-list.component';
import { TariffPlansComponent } from './components/tariff-plans/tariff-plans.component';
import { PortalsRoutingModule } from './portals-routing.module';
import { IsPortalOwnerService } from './resolvers/is-portal-owner.service';
import { PortalListResolverService } from './resolvers/portal-list-resolver.service';
import { UserHavePortalResolverService } from './resolvers/user-have-portal-resolver.service';
import { PortalService } from './services/portal.service';
import { SignupService } from './services/signup.service';



@NgModule({
  imports: [
    SharedModule,
    PortalsRoutingModule
  ],
  entryComponents: [
    AddPortalFormComponent,
    AddPortalForExistingUserComponent
  ],
  declarations: [
    TariffPlansComponent,
    AddPortalFormComponent,
    AddPortalForExistingUserComponent,
    PortalListComponent
  ],
  providers: [
    SignupService,
    PortalService,
    PortalListResolverService,
    UserHavePortalResolverService,
    IsPortalOwnerService
  ]
})
export class PortalModule { }
