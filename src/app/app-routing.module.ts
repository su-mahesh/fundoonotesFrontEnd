import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {AuthenticationGuard} from './authGuard/authentication.guard'

const routes: Routes = [
  {
    path: 'signup', component: SignupComponent, pathMatch: 'full'
  },
  { path : 'login', component: LoginComponent, pathMatch: 'full', },
  { path : 'ForgetPassword', component: ForgetPasswordComponent},
  { path : 'ResetPassword/:token', component: ResetPasswordComponent},
  {
    path: '', component: SignupComponent, pathMatch: 'full'
  },
  {
    path: 'Dashboard', component: DashboardComponent, canActivate: [AuthenticationGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  snapshot: any; 

}
