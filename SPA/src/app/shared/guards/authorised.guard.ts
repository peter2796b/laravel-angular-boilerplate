import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {AuthService} from '../services/app/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthorisedGuard implements CanActivate {

  constructor(
    private authService: AuthService
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    return this.isAuthorised(state.url);
  }

  private isAuthorised(url): any {
    let currentUser = this.authService.currentUserValue;
    let prefix = url.split('/')[1];
    if (prefix == currentUser.user.role) {
      return of(true);
    }
    return of(false);
  }


}
