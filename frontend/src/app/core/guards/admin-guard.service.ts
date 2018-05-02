import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Usergroup } from '../../shared/usergroup.enum';
import { DecodedToken } from '../../shared/decoded-token';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate() {
    if (DecodedToken.usergroupID() === Usergroup.admin) return true;

    this.router.navigate(['/not-found']);
    return false;
  }
}
