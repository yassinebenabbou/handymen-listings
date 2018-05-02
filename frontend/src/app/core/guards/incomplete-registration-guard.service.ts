import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { DecodedToken } from '../../shared/decoded-token';

@Injectable()
export class IncompleteRegistrationGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate() {
    if (DecodedToken.usergroupID()) return true;

    this.router.navigate(['/complete-registration']);
    return false;
  }

}
