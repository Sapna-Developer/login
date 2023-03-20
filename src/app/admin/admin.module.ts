import { RootComponent } from './root/root.component';
import { SharedModule } from '../shared/shared.module';
import { RoutingModule } from './routing/routing.module';
import { MaindashboardComponent } from './maindashboard/maindashboard.component';

import { UserManagementComponent } from './user-management/user-management.component';
import { ConfirmdialogComponent } from './confirmdialog/confirmdialog.component';
import { MenuService } from './menu.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AddUserManagementComponent } from './user-management/add-application/add-new-application.component';
import { AddGuestUserComponent } from './user-management/add-guest-user/add-guest-user.component';
import { GuestUserListComponent } from './user-management/guest-user-list/guest-user-list.component';
import { LogoutComponent } from './logout/logout.component';
import { SessionPageComponent } from './session-page/session-page.component';
import { ProjectsComponent } from './projects/projects.component';

@NgModule({
  imports: [
    CommonModule,
    RoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    MaindashboardComponent,
    RootComponent, 
    UserManagementComponent, 
    ConfirmdialogComponent,
    AddUserManagementComponent,
    AddGuestUserComponent,
    GuestUserListComponent,
    LogoutComponent,
    SessionPageComponent,
    ProjectsComponent
  ],
  providers: [MenuService],
  entryComponents: [ ConfirmdialogComponent, AddUserManagementComponent, AddGuestUserComponent, GuestUserListComponent,ProjectsComponent]

})
export class AdminModule {

  
}
