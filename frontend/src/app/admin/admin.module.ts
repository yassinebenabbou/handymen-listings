import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../core/guards/auth-guard.service';
import { AdminGuard } from '../core/guards/admin-guard.service';
import { SharedModule } from '../shared/shared.module';
import { ServicesComponent } from './services/services.component';
import { ServiceFormComponent } from './services/service-form/service-form.component';
import { AddServiceComponent } from './services/add-service/add-service.component';
import { EditServiceComponent } from './services/edit-service/edit-service.component';
import { AddCityComponent } from './cities/add-city/add-city.component';
import { EditCityComponent } from './cities/edit-city/edit-city.component';
import { CityFormComponent } from './cities/city-form/city-form.component';
import { CitiesComponent } from './cities/cities.component';
import { UsersComponent } from './users/users.component';
import { ShowUserComponent } from './users/show-user/show-user.component';

const adminRoutes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard, AdminGuard],
    children: [
      {
        path: 'services',
        component: ServicesComponent,
        children: [
          { path: 'edit/:id', component: EditServiceComponent },
          { path: 'add', component: AddServiceComponent }
        ]
      },
      {
        path: 'cities',
        component: CitiesComponent,
        children: [
          { path: 'edit/:id', component: EditCityComponent },
          { path: 'add', component: AddCityComponent }
        ]
      },
      {
        path: 'users',
        component: UsersComponent,
        children: [
          { path: 'show/:id', component: ShowUserComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(adminRoutes)
  ],
  exports: [RouterModule],
  declarations: [AdminComponent, ServicesComponent, ServiceFormComponent, AddServiceComponent, EditServiceComponent, AddCityComponent, EditCityComponent, CityFormComponent, CitiesComponent, UsersComponent, ShowUserComponent]
})
export class AdminModule { }
