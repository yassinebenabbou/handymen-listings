import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Http, HttpModule, RequestOptions } from '@angular/http';
import { DataService } from './data.service';
import { ServicesService } from './services.service';
import { CitiesService } from './cities.service';
import { AuthService } from './auth.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthConfig, AuthHttp } from 'angular2-jwt';
import { AuthGuard } from './guards/auth-guard.service';
import { AdminGuard } from './guards/admin-guard.service';
import { JwtHttpService } from './jwt-http.service';
import { GuestGuard } from './guards/guest-guard.service';
import { IncompleteRegistrationGuard } from './guards/incomplete-registration-guard.service';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenName: 'token',
    tokenGetter: (() => localStorage.getItem('token')),
    globalHeaders: [{'X-Requested-With': 'XMLHttpRequest'}],
    noJwtError: true
  }), http, options);
}

@NgModule({
  imports: [
    CommonModule,
    HttpModule
  ],
  exports: [],
  declarations: [PageNotFoundComponent],
  providers: [
    DataService,
    ServicesService,
    CitiesService,
    AuthService,
    AuthGuard,
    AdminGuard,
    GuestGuard,
    IncompleteRegistrationGuard,
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    },
    JwtHttpService,
  ]
})
export class CoreModule { }
