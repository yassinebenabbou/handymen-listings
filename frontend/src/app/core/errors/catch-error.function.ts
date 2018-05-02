import { Observable } from 'rxjs/Observable';
import { BadRequestError } from './bad-request-error';
import { NotFoundError } from './not-found-error';
import { AppError } from './app-error';

export function catchError(error: Response) {
  if (error.status === 400) {
    return Observable.throw(new BadRequestError(error.json()));
  } else if (error.status === 404) {
    return Observable.throw(new NotFoundError());
  } else {
    return Observable.throw(new AppError(error));
  }
}
