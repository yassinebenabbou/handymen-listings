import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { DecodedToken } from '../../shared/decoded-token';
import { Router } from '@angular/router';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.css']
})
export class SocialComponent implements OnInit {
  @Output() pending = new EventEmitter<any>();

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  login(provider) {
    this.pending.emit();
    this.authService.socialAuth(provider)
      .subscribe(
        res => {
          const usergroupID = DecodedToken.usergroupID();
          if (!usergroupID) this.router.navigate(['/complete-registration']);
          else if (usergroupID > 2) this.router.navigate(['/edit-profile']);
          else this.router.navigate(['/']);
        },
        err => console.log(err)
      );
  }

}
