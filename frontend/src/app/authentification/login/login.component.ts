import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../../core/auth.service';
import { UnauthorizedError } from '../../core/errors/unauthorized-error';
import { Router } from '@angular/router';
import { fadeInAnimation } from '../../animations/fade-in.animation';
import { DecodedToken } from '../../shared/decoded-token';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [fadeInAnimation],
  host: { '[@fadeInAnimation]': '' }
})
export class LoginComponent implements OnInit {

  pending = false;
  form;
  invalidCredentials = false;

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required
      ]]
    });
  }

  setPending() {
    this.pending = true;
  }

  login() {
    this.form.disable();
    this.authService.login(this.form.value)
      .subscribe(
        (response) => {
          if (DecodedToken.usergroupID() > 2) this.router.navigate(['/edit-profile']);
          else this.router.navigate(['/']);
        },
        error => {
          this.form.enable();
          if (error instanceof UnauthorizedError) {
            this.invalidCredentials = true;
          }
        }
      );
  }

}
