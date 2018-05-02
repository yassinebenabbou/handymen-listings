import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { FormBuilder } from '@angular/forms';
import { DecodedToken } from '../../shared/decoded-token';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  form;
  pending = false;
  picture;

  @Input() services;
  @Input() cities;

  constructor(private userService: UserService, private fb: FormBuilder) { }

  ngOnInit() {
    const userID = DecodedToken.userID();
    this.form = this.fb.group({
      full_name: [''],
      city_slug: [''],
      phone: ['']
    });

    this.form.disable();

    this.userService.getProfile(userID)
      .subscribe(
        user => {
          this.form.patchValue({...user.profile, 'city_slug': user['city_slug']});
          this.picture = user.picture;
          this.form.enable();
        }
      );
  }

  updateProfile() {
    this.pending = true;
    this.form.disable();
    this.userService.updateUserProfile(this.form.value)
      .subscribe(
        null,
        null,
        () => {
          this.pending = false;
          this.form.enable();
        }
      );
  }

}
