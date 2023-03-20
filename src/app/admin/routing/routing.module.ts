import { SessionPageComponent } from './../session-page/session-page.component';
import { RedirectGuard } from './../../services/redirect-guard-service';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { UserManagementComponent } from '../user-management/user-management.component';
import { LogoutComponent } from '../logout/logout.component';

const adminRoutes: Routes = [
  {path: 'logout', component: LogoutComponent},
  {path: 'user-management', component: UserManagementComponent},
  {path: 'session', component: SessionPageComponent, canActivate: [RedirectGuard],
  data: {
    externalUrl: localStorage.getItem('redirect_appurl')+'/maindashboard'
  }},
];

@NgModule({
  imports: [
    RouterModule.forChild(adminRoutes)
  ],
  exports: [RouterModule]
})
export class RoutingModule {
  
}


