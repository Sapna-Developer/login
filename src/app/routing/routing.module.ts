import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { AuthGuard } from '../services/auth-guard-service';
import { LoginComponent } from '../auth/login/login.component';
import { ResetPwdComponent } from '../admin/reset-password/reset-password.component';

const appRoutes: Routes = [
  {path: 'guest_reset_password', component: ResetPwdComponent},
  {path: '', redirectTo: 'session', pathMatch: 'full', canActivate: [AuthGuard]},
  {path: '', loadChildren: '../auth/auth.module#AuthModule'},
  {path: '', loadChildren: '../admin/admin.module#AdminModule', canActivate: [AuthGuard]},
  {path: '**', redirectTo: ''}
];
 
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class RoutingModule {
  
}
