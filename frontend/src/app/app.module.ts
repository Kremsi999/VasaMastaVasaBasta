import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaModule } from 'ng-recaptcha';
import { FormsModule } from '@angular/forms';
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
    AdminAppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RecaptchaModule,
    FormsModule,
    HttpClientModule
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
