import {Injectable} from '@angular/core';
import {ICurrentUser} from '../../models/contracts/current-user';
import {AuthService} from "./auth.service";


@Injectable({
  providedIn: 'root',
})
export class NavigationService {

  /**
   *
   * @private
   */
  private currentUser: ICurrentUser;

  constructor(
    private auth: AuthService
  ) {
    this.currentUser = this.auth.currentUserValue;
  }

  getNavItemsBasedOnUserRole() {
    switch (this.currentUser.user.role) {
      case 'admin':
        return this.navItemsForAdmin();
      case 'super-admin':
        return this.navItemsForSuperAdmin();

    }
  }

  navItemsForAdmin() {
    return [
      {
        path: 'home',
        icon: 'home',
        label: 'Home'
      },
      {
        path: 'users',
        icon: 'group',
        label: 'Users'
      }

    ]
  }

  navItemsForSuperAdmin() {
    return [
      {
        path: 'home',
        icon: 'home',
        label: 'Home'
      },
      {
        path: 'users',
        icon: 'group',
        label: 'Users'
      }

    ]
  }


}
