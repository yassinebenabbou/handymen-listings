import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { JwtHttpService } from './jwt-http.service';
import { BadRequestError } from './errors/bad-request-error';
import { NotFoundError } from './errors/not-found-error';
import { AppError } from './errors/app-error';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  constructor(protected authHttp: JwtHttpService, private url: string) { }

  getAll() {
    return this.authHttp.get(this.url);
  }

  getOne(id) {
    return this.authHttp.get(this.url + '/' + id);
  }

  create(resource) {
    return this.authHttp.post(this.url, resource);
  }

  update(id, resource) {
    return this.authHttp.put(this.url + '/' + id, resource);
  }

  destroy(id) {
    return this.authHttp.delete(this.url + '/' + id);
  }


}
