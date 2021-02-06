import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';

import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthAPIService {

  constructor(private httpClient: HttpClient) {
  }

  login(request): Observable<any> {
    return this.httpClient.post<any>('auth/login', request);
  }


  refresh(refreshToken: string): Observable<any> {
    return this.httpClient.post<any>('auth/refresh', {refresh_token: refreshToken});
  }

  logout() {
    return this.httpClient.delete('auth/logout');
  }

}
