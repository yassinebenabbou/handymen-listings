import { JwtHelper } from 'angular2-jwt';

const jwtHelper = new JwtHelper();
export class DecodedToken {
  static userID() {
    return +(jwtHelper.decodeToken(localStorage.getItem('token')).sub);
  }
  static usergroupID() {
    return +(jwtHelper.decodeToken(localStorage.getItem('token')).usergroup_id);
  }
}
