import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { FormBuilder, Validators } from '@angular/forms';
import { DecodedToken } from '../../shared/decoded-token';

@Component({
  selector: 'app-freelancer-form',
  templateUrl: './freelancer-form.component.html',
  styleUrls: ['./freelancer-form.component.css']
})
export class FreelancerFormComponent implements OnInit {
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
      full_name: ['', Validators.required],
      city_slug: ['', Validators.required],
      address: [''],
      phone: ['', Validators.required],
      gender: ['', Validators.required],
      CIN: ['', Validators.required],
      CAE: ['']
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
    this.userService.updateFreelancerProfile(this.form.value)
      .subscribe(null, null, () => {
        this.pending = false;
        this.form.enable();
      });
  }

}
