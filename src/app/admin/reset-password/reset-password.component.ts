import { CommonServices } from './../../services/common-services';
import { GlobalServices } from './../../services/global-services';
import { Router, ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DialogResetPwdComponent } from './dialog-resetpwd/dialog-resetpwd.component';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';
import { NgForm } from '@angular/forms';

export interface User {
  employee_id: string;
  usename: string;
  work_email: string;
}

@Component({
  selector: 'app-reset-pwd',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.sass']
})

export class ResetPwdComponent implements OnInit {

  userdata: any = {};
  atob_url: string;

  currentUser: any;
  userRoles: any;

  dialogRef: MatDialogRef<DialogResetPwdComponent>;

  username: string;
  decodeTokenResponse: string;

  @ViewChild('password', {static: true}) input_password: ElementRef;
  isExpired: boolean;

  onSubmitLoading: boolean;

  constructor(
    private commonService: CommonServices,
    public globalService: GlobalServices,
    public dialog: MatDialog,
    public route: ActivatedRoute,
    public snackBar: MatSnackBar
  ) {

    this.route.queryParams.subscribe(params => {
      if (params['response_type'] == undefined) {
      
      } else {

        const helper = new JwtHelperService();

        const decodedToken = helper.decodeToken(params['response_type']);
        const expirationDate = helper.getTokenExpirationDate(params['response_type']);
        this.isExpired = helper.isTokenExpired(params['response_type']);

        this.decodeTokenResponse = params['response_type'];


        this.username = decodedToken.username;
        let email = decodedToken.email;

      }
    });


    //this.currentUser = this.globalService.getLocalItem('authentication', true)['data'];
    //this.userRoles = this.globalService.rolesdata;

  }

  public onResendPassword(form: NgForm) {

    if (form.invalid) {
      return false;
    }

    this.onSubmitLoading = true;

    let btoa_password = btoa(this.userdata.password);

    let obj = {
      "password": btoa_password,
      "response_type": this.decodeTokenResponse
    }

    this.commonService.setResetpwd(obj).subscribe(
      res => {
        if (res['success'] == 1) {
          form.resetForm();
          
          this.dialogRef = this.dialog.open(DialogResetPwdComponent, {
            disableClose: false
          });
          this.dialogRef.componentInstance.confirmMessage = "Success"
          this.dialogRef.componentInstance.note = "Your password is successfully register with us";

          //this.dialogRef.componentInstance.note = "";

          this.dialogRef.afterClosed().subscribe(result => {
            if (result) {
            }
            this.dialogRef = null;
          });

        } else if (res['success'] == 2) {
          form.resetForm();
          this.dialogRef = this.dialog.open(DialogResetPwdComponent, {
            disableClose: false
          });
          this.dialogRef.componentInstance.confirmMessage = "Expired"
          this.dialogRef.componentInstance.note = "Your password has expired. please change it.";

          //this.dialogRef.componentInstance.note = "";

          this.dialogRef.afterClosed().subscribe(result => {
            if (result) {
            }
            this.dialogRef = null;
          });
        } else {
          form.resetForm();
          this.snackBar.open(res["message"], "close", {
            duration: 2000,
          });
        }
        this.onSubmitLoading = false;
      },
      err => {
        console.log(err);
        this.onSubmitLoading = false;
      });
  }

  ngOnInit() {

  }
}
