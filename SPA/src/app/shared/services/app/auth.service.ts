import {Injectable} from '@angular/core';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {BehaviorSubject, from, Observable, throwError} from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';
import {StorageTypes} from '../../models/storageTypes';
import {AuthAPIService} from '../api/auth.api.service';
import {tap} from 'rxjs/operators';
import {ICurrentUser} from '../../models/contracts/current-user';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private jwt = new JwtHelperService();
  private currentUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api: AuthAPIService
  ) {
    this.initCurrentUser();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }


  login(request: any): Observable<any> {
    return this.api.login(request)
      .pipe(
        tap(t => {
          this.setCurrentUser(t);
        })
      );
  }

  refresh(): Observable<any> {

    if (!this.currentUserValue) {
      return throwError('No user localStorage');
    }
    return this.api.refresh(this.currentUserValue.refreshToken)
      .pipe(
        tap(t => {
          this.currentUserValue.token = t.access_token;
          this.currentUserValue.refreshToken = t.refresh_token;
          localStorage.setItem(StorageTypes.CurrentUser, JSON.stringify(this.currentUserValue));
          this.currentUserSubject.next(this.currentUserValue);
        })
      );
  }

  isAuthenticated(): boolean {
    if (this.currentUserValue) {
      return this.currentUserValue.token && !this.jwt.isTokenExpired(this.currentUserValue.token);
    }
    return false;
  }

  logout(): Observable<any> {
    this.removeCurrentUser();
    this.redirectToLogin();
    return this.api.logout();
  }


  redirectToLogin(options: NavigationExtras = {}): Observable<boolean> {
    return from(this.router.navigate(['auth/login'], options));
  }

  redirectToDashboard(options: NavigationExtras = {}): Observable<boolean> {
    let role = this.currentUserValue.user.role;
    return from(this.router.navigate([`/${role}/home`], options));
  }


  private initCurrentUser(): any {
    const currentUserJson = localStorage.getItem(StorageTypes.CurrentUser);
    if (currentUserJson) {
      this.currentUserSubject.next(JSON.parse(currentUserJson));
    }
  }

  private setCurrentUser(loginResponse): void {

    const currentUser: ICurrentUser = {
      token: loginResponse.access_token,
      refreshToken: loginResponse.refresh_token,
      user: loginResponse.user,
    };


    localStorage.setItem(StorageTypes.CurrentUser, JSON.stringify(currentUser));
    this.currentUserSubject.next(currentUser);
  }

  getCurrentUser(): ICurrentUser {
    const currentUser = localStorage.getItem(StorageTypes.CurrentUser);
    return JSON.parse(currentUser);
  }

  private removeCurrentUser(): void {
    localStorage.removeItem(StorageTypes.CurrentUser);
    this.currentUserSubject.next(null);
  }
}
