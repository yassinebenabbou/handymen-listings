
import { ErrorHandler } from '@angular/core';
import { UnauthorizedError } from './unauthorized-error';
import { AuthService } from '../auth.service';

export class AppErrorHandler implements ErrorHandler {
  handleError(error) {
    console.log(error);
    if ( error instanceof UnauthorizedError) {
      AuthService.logout();
    }
  }
}
