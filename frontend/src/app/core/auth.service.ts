import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { JwtHttpService } from './jwt-http.service';
import { apiUrl } from '../shared/api';
import { AuthService as SocialService } from 'ng2-ui-auth';

@Injectable()
export class AuthService {

  constructor(private authHttp: JwtHttpService, private socialService: SocialService) { }

  static loggedIn() {
    return tokenNotExpired();
  }

  static logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('ng2-ui-auth_token');
  }

  login(formValue) {
    return this.authHttp
      .post(apiUrl('login'), formValue)
      .do(response => localStorage.setItem('token', response.token));
  }

  register(formValue) {
    return this.authHttp
      .post(apiUrl('register'), formValue)
      .do(response => localStorage.setItem('token', response.token));
  }

  completeRegistration(formValue) {
    return this.authHttp
      .post(apiUrl('completeRegistration'), formValue)
      .do(response => localStorage.setItem('token', response.token));
  }

  emailAvailable(email) {
    return this.authHttp
      .post(apiUrl('emailAvailable'), {email});
  }

  socialAuth(provider) {
    return this.socialService
      .authenticate(provider)
      .map(response => response.json())
      .do(response => localStorage.setItem('token', response.token));
  }

}
