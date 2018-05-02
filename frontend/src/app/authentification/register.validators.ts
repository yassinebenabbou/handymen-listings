import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AuthService } from '../core/auth.service';

export class RegisterValidators {

  static emailAvailable(authService: AuthService) {
    return (control: AbstractControl): Observable<ValidationErrors|null> => {
      return authService.emailAvailable(control.value);
    };
  }

  static passwordConfirmed(group: AbstractControl) {
    return group.get('password').value === group.get('password_confirmation').value ?
      null : group.get('password_confirmation').setErrors({ confirmed: true });
  }
}
