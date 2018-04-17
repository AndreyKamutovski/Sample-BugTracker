import { NgModule } from '@angular/core';

import { SharedModule } from './../shared/shared.module';
import { AddPortalFormComponent } from './components/add-portal-form/add-portal-form.component';
import { PortalListComponent } from './components/portal-list/portal-list.component';
import { TariffPlansComponent } from './components/tariff-plans/tariff-plans.component';
import { PortalListResolverService } from './resolvers/portal-list-resolver.service';
import { PortalService } from './services/portal.service';
import { SignupService } from './services/signup.service';
import { IsPortalOwnerService } from './resolvers/is-portal-owner.service';



@NgModule({
  imports: [
    SharedModule
  ],
  entryComponents: [
    AddPortalFormComponent
  ],
  declarations: [
    TariffPlansComponent,
    AddPortalFormComponent,
    PortalListComponent
  ],
  providers: [
    SignupService,
    PortalService,
    PortalListResolverService,
    IsPortalOwnerService
  ]
})
export class PortalModule { }
