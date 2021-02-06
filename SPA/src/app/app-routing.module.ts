import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthorisedComponent} from "./layouts/authorised/authorised.component";
import {AuthRedirectGuard} from "./shared/guards/auth-redirect.guard";
import {WelcomeComponent} from "./welcome/welcome.component";
import {AuthorisedGuard} from "./shared/guards/authorised.guard";

const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent
  },
  {
    path: 'auth',
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)
      }
    ]
  },
  {
    path: 'admin',
    canActivate: [AuthRedirectGuard, AuthorisedGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule)
      },
    ]
  },
  {
    path: 'super-admin',
    canActivate: [AuthRedirectGuard, AuthorisedGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/super-admin/super-admin.module').then(m => m.SuperAdminModule)
      },
    ]
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
