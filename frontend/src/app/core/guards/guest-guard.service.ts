import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable()
export class GuestGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate() {
    if (!AuthService.loggedIn()) return true;

    this.router.navigate(['/']);
    return false;
  }

}
