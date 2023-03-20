import { CommonServices } from './../../services/common-services';
import { GlobalServices } from './../../services/global-services';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-session-page',
  templateUrl: './session-page.component.html',
  styleUrls: ['./session-page.component.sass']
})

export class SessionPageComponent implements OnInit {

  currentUser: any;

  project_name: string;

  constructor(
    private commonService: CommonServices,
    public globalService: GlobalServices,
    public dialog: MatDialog,
    public route: ActivatedRoute,
    public snackBar: MatSnackBar
  ) {

    this.currentUser = this.globalService.getLocalItem('authentication', true);
    console.log(this.currentUser);

    let res = this.currentUser;

    if (res['success'] == '1') {

      let app_id = res['data']['app_details']['app_id'];
      let app_url = res['data']['app_details']['app_url'];

      let btoa_data = btoa(JSON.stringify(res));

      //global server
      localStorage.setItem('redirect_appurl', app_url);
      window.location.href = app_url+"/reload?code="+app_id+"&response_type=" + btoa_data + "&redirect_uri=" + this.globalService.parentDomain;

      //local server
      //localStorage.setItem('redirect_appurl', 'http://localhost:9205');
      //window.location.href = "http://localhost:9205/reload?code=" + app_id + "&response_type=" + btoa_data + "&redirect_uri=" + this.globalService.parentDomain;

    } else if (res['success'] == '0') {
      console.log(res['message']);
    }
    //window.location.href = url_path;
  }

  ngOnInit() {

  }
}
