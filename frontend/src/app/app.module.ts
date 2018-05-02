import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SearchModule } from './search/search.module';
import { UserModule } from './user/user.module';
import { AuthentificationModule } from './authentification/authentification.module';
import { AppErrorHandler } from './core/errors/app-error-handler';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AdminModule } from './admin/admin.module';
import { CustomConfig, Ng2UiAuthModule } from 'ng2-ui-auth';
import { environment as env } from '../environments/environment';
import { HomeComponent } from './home/home.component';
import {StarRatingModule} from 'angular-star-rating';
import { ContactComponent } from './contact/contact.component';


const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'contact', component: ContactComponent },
  { path: '**', component: PageNotFoundComponent }
];

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

export class MyAuthConfig extends CustomConfig {
  defaultHeaders = {'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest'};
  providers = {
    facebook: {clientId: env.facebook},
    google: {clientId: env.google}
  };
  baseUrl = env.apiUrl;
  tokenName = 'token';
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    SearchModule,
    UserModule,
    AuthentificationModule,
    AdminModule,
    StarRatingModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    Ng2UiAuthModule.forRoot(MyAuthConfig),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    { provide: ErrorHandler, useClass: AppErrorHandler }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
