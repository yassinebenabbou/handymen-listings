import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { Router } from '@angular/router';
import { Usergroup} from '../shared/usergroup.enum';
import { DecodedToken } from '../shared/decoded-token';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Output() switchLanguage = new EventEmitter();

  constructor(private router: Router) { }

  ngOnInit() {
  }
w
  logout() {
    AuthService.logout();
    this.router.navigate(['/']);
  }

  get loggedIn() {
    return AuthService.loggedIn();
  }

  get admin() {
    return DecodedToken.usergroupID() === Usergroup.admin;
  }

  setLanguage(lang: string) {
    this.switchLanguage.emit(lang);
  }

}
