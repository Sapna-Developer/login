import { CommonServices } from './../../services/common-services';
import { GlobalServices } from './../../services/global-services';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';

export interface User {
  employee_id: string;
  usename: string;
  work_email: string;
}

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.sass']
})

export class LogoutComponent implements OnInit {

  userdata: any = {};

  currentUser: any;
  userRoles: any;
  username: string;
  onSubmitLoading: boolean;

  constructor(
    private commonService: CommonServices,
    public globalService: GlobalServices,
    public dialog: MatDialog,
    public route: ActivatedRoute,
    public snackBar: MatSnackBar
  ) {

    //this.currentUser = this.globalService.getLocalItem('authentication', true)['data'];
    //this.userRoles = this.globalService.rolesdata;

    this.route.queryParams.subscribe(params => {
      if (params['response_type'] == undefined) {
       
      } else {

      }
    });


    this.userLogout();
  }

  public userLogout() {
    let obj = {};
    this.commonService.getLogout(obj).subscribe(res => {
      if (res['success'] == 1) {
        this.globalService.logout();
        this.snackBar.open(res["message"], "close", {
          duration: 2000,
        });
      } else {
        this.snackBar.open(res["message"], "close", {
          duration: 2000,
        });
      }
    },
      err => {
        console.log(err);
      });
    
  }

  ngOnInit() {

  }
}
