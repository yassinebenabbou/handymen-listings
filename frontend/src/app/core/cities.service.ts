import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { JwtHttpService } from './jwt-http.service';
import { apiUrl } from '../shared/api';

@Injectable()
export class CitiesService extends DataService {

  constructor(authHttp: JwtHttpService) {
    super(authHttp, apiUrl('cities'));
  }
}
