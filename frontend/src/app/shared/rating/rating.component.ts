import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../user/user.service';
import { AuthService } from '../../core/auth.service';
import { DecodedToken } from '../decoded-token';
import { Usergroup } from '../usergroup.enum';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {
  @Input() user;
  @Input() size;
  @Input() readOnly;
  rating;
  total;

  constructor(private userService: UserService) { }

  ngOnInit() {
    if (this.user) {
      this.rating = this.user.rating.auth_rating || this.user.rating.rating;
      this.total = this.user.rating.total;
    }
  }

  get canRate() {
    return AuthService.loggedIn() && (DecodedToken.usergroupID() === Usergroup.user);
  }

  onClick($event) {
    console.log($event.rating);
    this.userService.rate(this.user.id, $event.rating)
      .subscribe(
        response => {
          console.log(response);
          this.rating = response.auth_rating || response.rating;
          this.total = response.total;
        }
      );
  }

}
