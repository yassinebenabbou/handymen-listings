import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DecodedToken } from '../../shared/decoded-token';

@Component({
  selector: 'app-complete-registration',
  templateUrl: './complete-registration.component.html',
  styleUrls: ['./complete-registration.component.css']
})
export class CompleteRegistrationComponent implements OnInit {
  form;

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.form = this.fb.group({
      usergroup_id: ['', Validators.required]
    });
  }

  complete() {
    this.authService.completeRegistration(this.form.value)
      .subscribe(
        (res) => {
          this.router.navigate(['/edit-profile']);
        },
            (error) => console.log(error)
      );
  }

}
