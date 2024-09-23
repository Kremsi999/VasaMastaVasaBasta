import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaModule } from 'ng-recaptcha';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { RegistrationComponent } from './registration/registration.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OwnerProfileComponent } from './owner-profile/owner-profile.component';
import { OwnerAppComponent } from './owner-app/owner-app.component';
import { DekoratorAppComponent } from './dekorator-app/dekorator-app.component';
import { AdminAppComponent } from './admin-app/admin-app.component';
import { DecoratorProfileComponent } from './decorator-profile/decorator-profile.component';
import { OwnerFirmsPageComponent } from './owner-firms-page/owner-firms-page.component';
import { FirmDetailsComponent } from './firm-details/firm-details.component';
import { WizardJobComponent } from './wizard-job/wizard-job.component';
import { OwnerSchedulingComponent } from './owner-scheduling/owner-scheduling.component';
import { OwnerMaintenanceComponent } from './owner-maintenance/owner-maintenance.component';
import { DecoratorSchedulingComponent } from './decorator-scheduling/decorator-scheduling.component';
import { DecoratorMaintenanceComponent } from './decorator-maintenance/decorator-maintenance.component';
import { DecoratorStatsComponent } from './decorator-stats/decorator-stats.component';
import { NgChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    ChangePasswordComponent,
    DashboardComponent,
    OwnerProfileComponent,
    OwnerAppComponent,
    DekoratorAppComponent,
    AdminAppComponent,
    DecoratorProfileComponent,
    OwnerFirmsPageComponent,
    FirmDetailsComponent,
    WizardJobComponent,
    OwnerSchedulingComponent,
    OwnerMaintenanceComponent,
    DecoratorSchedulingComponent,
    DecoratorMaintenanceComponent,
    DecoratorStatsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RecaptchaModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: RECAPTCHA_V3_SITE_KEY,
      useValue: environment.recaptcha.siteKey,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
