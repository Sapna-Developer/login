import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { RoutingModule } from './routing/routing.module';
import { CommonServices } from './services/common-services';
import { GlobalServices } from './services/global-services';
import { HttpServices } from './services/http-services';
import { AuthGuard } from './services/auth-guard-service';
import { RedirectGuard } from './services/redirect-guard-service';
import { ResetPwdComponent } from './admin/reset-password/reset-password.component';
import { DialogResetPwdComponent } from './admin/reset-password/dialog-resetpwd/dialog-resetpwd.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    RoutingModule,
    
    
  ],
  declarations: [
    AppComponent,
    ResetPwdComponent,
    DialogResetPwdComponent
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [ DialogResetPwdComponent ],
  providers: [
    CommonServices,
    GlobalServices,
    HttpServices,
    AuthGuard,
    RedirectGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
