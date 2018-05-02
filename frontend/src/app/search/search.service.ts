import { Injectable } from '@angular/core';
import { JwtHttpService } from '../core/jwt-http.service';
import { apiUrl } from '../shared/api';

@Injectable()
export class SearchService {

  constructor(private authHttp: JwtHttpService) { }

  search(data) {
    return this.authHttp.post(apiUrl('search'), data);
  }
}
