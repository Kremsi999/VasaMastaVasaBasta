import { RegistrationComponent } from './registration/registration.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OwnerAppComponent } from './owner-app/owner-app.component';
import { DekoratorAppComponent } from './dekorator-app/dekorator-app.component';
import { AdminAppComponent } from './admin-app/admin-app.component';
import { OwnerProfileComponent } from './owner-profile/owner-profile.component';

const routes: Routes = [
  {path: 'register',component:  RegistrationComponent},
  { path: '', component:DashboardComponent },
  {path: 'login', component:  LoginComponent}, 
  {path: 'adminLogin', component:  LoginComponent}, 
  {path: 'changePassword', component:  ChangePasswordComponent},
  {
    path: 'owner', 
    component:  OwnerAppComponent,
    children : [
      {
        path: 'profile',
        component: OwnerProfileComponent
      },
      {
        path: '',
        component: OwnerProfileComponent
      }
    ]
  },
  {path: 'decorator', component:  DekoratorAppComponent},
  {path: 'admin', component:  AdminAppComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
