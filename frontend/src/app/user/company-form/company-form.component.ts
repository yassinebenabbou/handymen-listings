import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { FormBuilder, Validators } from '@angular/forms';
import { DecodedToken } from '../../shared/decoded-token';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.css']
})
export class CompanyFormComponent implements OnInit {
  form;
  picture;
  pending = false;
  profileExists = true;

  @Input() cities;
  @Input() services;

  constructor(private userService: UserService, private fb: FormBuilder) { }

  ngOnInit() {
    const userID = DecodedToken.userID();

    this.form = this.fb.group({
      name: ['', Validators.required],
      city_slug: ['', Validators.required],
      phone: ['', Validators.required]
    });

    this.form.disable();

    this.userService.getProfile(userID)
      .subscribe(
        user => {
          this.profileExists = user.profile !== null;
          this.form.patchValue({...user.profile, 'city_slug': user['city_slug']});
          this.picture = user.picture;
          this.form.enable();
        },
        () => this.profileExists = false
      );
  }

  updateProfile() {
    this.pending = true;
    this.form.disable();
    this.userService.updateCompanyProfile(this.form.value)
      .subscribe(
        null,
        null,
        () => {
        this.pending = false;
        this.form.enable();
      });
  }

}
