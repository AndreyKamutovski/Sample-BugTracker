import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AngularMaterialDesignModule } from '../angular-material-design/angular-material-design.module';
import { SignupService } from '../services/signup.service';
import { AddPortalFormComponent } from './add-portal-form/add-portal-form.component';
import { PortalService } from './portal.service';
import { TariffPlansComponent } from './tariff-plans/tariff-plans.component';
import { RouterModule } from '@angular/router';
import { PortalListComponent } from './portal-list/portal-list.component';
import { PortalDataSourceService } from './portal-data-source.service';
import { PortalListResolverService } from './portal-list-resolver.service';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialDesignModule,
    RouterModule
  ],
  entryComponents: [
    AddPortalFormComponent
  ],
  declarations: [TariffPlansComponent, AddPortalFormComponent, PortalListComponent],
  providers: [SignupService, PortalService, PortalListResolverService, PortalDataSourceService]
})
export class PortalModule { }
