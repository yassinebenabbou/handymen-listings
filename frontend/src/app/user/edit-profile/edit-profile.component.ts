import { Component, OnInit } from '@angular/core';
import { Usergroup } from '../../shared/usergroup.enum';
import { CitiesService } from '../../core/cities.service';
import { fadeInAnimation } from '../../animations/fade-in.animation';
import { DecodedToken } from '../../shared/decoded-token';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
  animations: [fadeInAnimation],
  host: { '[@fadeInAnimation]': '' }
})
export class EditProfileComponent implements OnInit {
  usergroups;
  usergroup;

  cities;

  constructor(private citiesService: CitiesService) {
    this.usergroups = Usergroup;
    this.usergroup = DecodedToken.usergroupID();
  }

  ngOnInit() {
    this.citiesService.getAll()
      .subscribe(
        cities => this.cities = cities
      );
  }

}
