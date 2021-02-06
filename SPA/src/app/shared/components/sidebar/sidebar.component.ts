import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NavigationService} from "../../services/app/navigation.service";
import {AuthService} from "../../services/app/auth.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  /**
   * Event to close the sidebar
   */
  @Output() closeSideBar: EventEmitter<any> = new EventEmitter();

  /**
   * navigation items
   */
  navItems

  constructor(private _navigationService: NavigationService, private _authService: AuthService) {
    this.navItems = this._navigationService.getNavItemsBasedOnUserRole();
  }

  ngOnInit(): void {
  }

  /**
   * Close sidebar
   */
  close() {
    this.closeSideBar.emit();
  }

  /**
   * logout the user
   */
  logout() {
    this._authService.logout();
  }
}
