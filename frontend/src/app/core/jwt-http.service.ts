import { Injectable } from '@angular/core';
import { Request, Response, RequestOptionsArgs, RequestOptions, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import { UnauthorizedError } from './errors/unauthorized-error';
import { AppError } from './errors/app-error';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/observable/throw';


@Injectable()
export class JwtHttpService {

  constructor(private authHttp: AuthHttp, private router: Router) {
  }

  private static refreshToken(response: Response) {
    const authHeader = response.headers.get('Authorization');
    if (authHeader) {
      localStorage.setItem('token', authHeader.split(' ')[1]);
    }
  }

  private static extractData(response: Response): any {
    return response.json();
  }

  private static catchError(error: Response) {
    if (error.status === 401 || error.status === 422) {
      return Observable.throw(new UnauthorizedError(error.json()));
    } else {
      return Observable.throw(new AppError(error));
    }
  }

  public setGlobalHeaders(headers: Array<Object>, request: Request | RequestOptionsArgs) {
    this.authHttp.setGlobalHeaders(headers, request);
  }

  public request(url: string | Request, options?: RequestOptionsArgs): Observable<any> {
    return this.authHttp.request(url, options)
      .do(JwtHttpService.refreshToken)
      .map(JwtHttpService.extractData)
      .catch(JwtHttpService.catchError);
  }

  public get(url: string, options?: RequestOptionsArgs): Observable<any> {
    return this.authHttp.get(url, options)
      .do(JwtHttpService.refreshToken)
      .map(JwtHttpService.extractData)
      .catch(JwtHttpService.catchError);
  }

  public post(url: string, body: any, options?: RequestOptionsArgs): Observable<any> {
    return this.authHttp.post(url, body, options)
      .do(JwtHttpService.refreshToken)
      .map(JwtHttpService.extractData)
      .catch(JwtHttpService.catchError);
  }

  public put(url: string, body: any, options?: RequestOptionsArgs): Observable<any> {
    return this.authHttp.put(url, body, options)
      .do(JwtHttpService.refreshToken)
      .map(JwtHttpService.extractData)
      .catch(JwtHttpService.catchError);
  }

  public delete(url: string, options?: RequestOptionsArgs): Observable<any> {
    return this.authHttp.delete(url, options)
      .do(JwtHttpService.refreshToken)
      .map(JwtHttpService.extractData)
      .catch(JwtHttpService.catchError);
  }

  public patch(url: string, body: any, options?: RequestOptionsArgs): Observable<any> {
    return this.authHttp.patch(url, body, options)
    .do(JwtHttpService.refreshToken)
      .map(JwtHttpService.extractData)
      .catch(JwtHttpService.catchError);
  }

  public head(url: string, options?: RequestOptionsArgs): Observable<any> {
    return this.authHttp.head(url, options)
      .do(JwtHttpService.refreshToken)
      .map(JwtHttpService.extractData)
      .catch(JwtHttpService.catchError);
  }

  public options(url: string, options?: RequestOptionsArgs): Observable<any> {
    return this.authHttp.options(url, options)
      .do(JwtHttpService.refreshToken)
      .map(JwtHttpService.extractData)
      .catch(JwtHttpService.catchError);
  }
}
