import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from '../services/app/auth.service';

@Injectable( {
    providedIn: 'root',
} )
export class AuthRedirectGuard implements CanActivate {

    constructor(
        private authService: AuthService
    ) {
    }

    canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): any {
        return this.checkOrRefresh( state.url );
    }

    private checkOrRefresh( redirectUrl?: string ): any {
        if( !this.authService.isAuthenticated() ) {
            return this.refreshOrRedirect( redirectUrl );
        }
        return of( true );
    }

    private refreshOrRedirect( redirectUrl?: string ): any {
        return this.authService.refresh()
            .pipe(
                map( r => true ),
                catchError( err => this.authService.redirectToLogin( { queryParams: { returnUrl: redirectUrl } } ) )
            )
    }
}
