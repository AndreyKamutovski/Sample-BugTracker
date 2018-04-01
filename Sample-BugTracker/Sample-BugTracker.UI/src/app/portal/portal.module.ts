import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AngularMaterialDesignModule } from '../angular-material-design/angular-material-design.module';
import { SignupService } from '../services/signup.service';
import { AddPortalFormComponent } from './add-portal-form/add-portal-form.component';
import { PortalService } from './portal.service';
import { TariffPlansComponent } from './tariff-plans/tariff-plans.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialDesignModule,
  ],
  entryComponents: [
    AddPortalFormComponent
  ],
  declarations: [TariffPlansComponent, AddPortalFormComponent],
  providers: [SignupService, PortalService]
})
export class PortalModule { }
