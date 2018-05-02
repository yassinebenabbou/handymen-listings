import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth.service';
import { RegisterValidators } from '../register.validators';
import { Router } from '@angular/router';
import { fadeInAnimation } from '../../animations/fade-in.animation';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  animations: [fadeInAnimation],
  host: { '[@fadeInAnimation]': '' }
})
export class RegisterComponent implements OnInit {

  pending = false;
  form;
  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email
      ], [
        RegisterValidators.emailAvailable(this.authService)
      ]],
      password: ['', [
        Validators.minLength(6),
        Validators.required
      ]],
      password_confirmation: [''],
      usergroup_id: ['', [
        Validators.required
      ]]
    }, {
      validator: RegisterValidators.passwordConfirmed
    });

  }

  setPending() {
    this.pending = true;
  }

  register() {
    this.form.disable();
    this.authService.register(this.form.value)
      .subscribe(
        () => this.router.navigate(['/edit-profile']),
      error => {
          this.form.enable();
        }
      );
  }

}
