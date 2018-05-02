import { Injectable } from '@angular/core';
import { JwtHttpService } from '../core/jwt-http.service';
import { apiUrl } from '../shared/api';

@Injectable()
export class  UserService {

  constructor(private authHttp: JwtHttpService) { }

  getServices() {
    return this.authHttp.get(apiUrl('userServices'));
  }

  getProfile(id) {
    return this.authHttp.get(apiUrl('profile', id));
  }

  getRating(id) {
    return this.authHttp.post(apiUrl('rating', id), {});
  }

  rate(id, rating) {
    return this.authHttp.post(apiUrl('rate', id), {rating});
  }

  attachService(id) {
    return this.authHttp.post(apiUrl('attachService', id), {});
  }

  attachNewService(service) {
    return this.authHttp.post(apiUrl('attachNewService'), service);
  }

  detachService(id) {
    return this.authHttp.delete(apiUrl('detachService', id));
  }

  uploadPicture(picture) {
    return this.authHttp.post(apiUrl('uploadPicture'), picture);
  }

  updateUserProfile(profile) {
    return this.authHttp.post(apiUrl('userProfile'), profile);
  }

  updateFreelancerProfile(profile) {
    return this.authHttp.post(apiUrl('freelancerProfile'), profile);
  }
  updateCompanyProfile(profile) {
    return this.authHttp.post(apiUrl('companyProfile'), profile);
  }

}
