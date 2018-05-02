import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { SocialComponent } from './social/social.component';
import { GuestGuard } from '../core/guards/guest-guard.service';
import { CompleteRegistrationComponent } from './complete-registration/complete-registration.component';
import { AuthGuard } from '../core/guards/auth-guard.service';

const authRoutes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [GuestGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [GuestGuard] },
  { path: 'complete-registration', component: CompleteRegistrationComponent, canActivate: [AuthGuard] },
  { path: 'change-status', component: CompleteRegistrationComponent, canActivate: [AuthGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [GuestGuard] }
];
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(authRoutes)
  ],
  exports: [
    RouterModule
  ],
  declarations: [LoginComponent, RegisterComponent, ForgotPasswordComponent, SocialComponent, CompleteRegistrationComponent]
})
export class AuthentificationModule { }
