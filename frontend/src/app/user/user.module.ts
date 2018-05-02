import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { UserFormComponent } from './user-form/user-form.component';
import { FreelancerFormComponent } from './freelancer-form/freelancer-form.component';
import { CompanyFormComponent } from './company-form/company-form.component';
import { RouterModule, Routes } from '@angular/router';
import { UserService } from './user.service';
import { SharedModule } from '../shared/shared.module';
import { ServiceFormComponent } from './service-form/service-form.component';
import { PictureFormComponent } from './picture-form/picture-form.component';
import { AuthGuard } from '../core/guards/auth-guard.service';
import { IncompleteRegistrationGuard } from '../core/guards/incomplete-registration-guard.service';

const userRoutes: Routes = [
  { path: 'profile/:id', component: ProfileComponent },
  {
    path: 'edit-profile',
    component: EditProfileComponent,
    children: [
      { path: 'services', component: ServiceFormComponent }
    ],
    canActivate: [AuthGuard, IncompleteRegistrationGuard]
  }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(userRoutes),
    SharedModule
  ],
  exports: [
    RouterModule
  ],
  declarations: [ProfileComponent, EditProfileComponent, UserFormComponent, FreelancerFormComponent, CompanyFormComponent, ServiceFormComponent, PictureFormComponent],
  providers: [UserService]
})
export class UserModule { }
