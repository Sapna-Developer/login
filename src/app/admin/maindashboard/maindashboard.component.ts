import { GlobalServices } from './../../services/global-services';
import { CommonServices } from './../../services/common-services';
import { DashboardMenu } from './../../models/dashboardmenu.model';
import { Router } from '@angular/router';
import { ConfirmdialogComponent } from '../confirmdialog/confirmdialog.component';
import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { MatDialogRef, MatSnackBar, MatDialog } from '@angular/material';
import { Overlay } from '@angular/cdk/overlay';

@Component({
  selector: 'app-maindashboard',
  templateUrl: './maindashboard.component.html',
  styleUrls: ['./maindashboard.component.sass']
})
export class MaindashboardComponent implements OnInit, OnDestroy {

  username: string;

  displaymenuLists: DashboardMenu[];
  solarimg = "solar";
  biomassimg = "biomass";
  windimg = "wind";
  hydroimg = "hydro";
  gisimg = "gis";
  data:any ={}
  show: boolean;

  currentUser: any = {};
  userRoles: any = [];

  show_menu: boolean;
  plant: any;
  role: any;

  dialogRef: MatDialogRef<ConfirmdialogComponent>;

  constructor(private GlobalServices: GlobalServices, public dialog: MatDialog, public snackBar: MatSnackBar, private commonService: CommonServices, private _router: Router, private overlay: Overlay) {

    let user = this.GlobalServices.getLocalItem('authentication', true)['data'];
    this.plant = user['projects']
    this.role = user['roles'];
  }

  ngOnInit() {
    this.currentUser = this.GlobalServices.getLocalItem('authentication', true)['data'];
    this.userRoles = this.GlobalServices.rolesdata;
    if (this.userRoles == "ADMIN") {
      this.show = true;
      this.show_menu = true;
    } else {
      this.show = false;
      this.show_menu = false;
    }
  }


  getDashboardList(): void {
    let obj = {
      "role": this.userRoles,
      "username": this.currentUser.username
    }
    this.commonService.mainDashboardlist(obj).subscribe(res => {
      if (res['success'] == 1) {
        this.displaymenuLists = res["data"];

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

  logoClick(){
   
    window.location.href = this.GlobalServices.parentDomain;
  }

  getDashboard(menu: DashboardMenu): void {

    const projectname = menu.project_name;
    const projecttype = menu.project_type;

    if (projecttype == "solar") {
      this._router.navigate(['/solar-tree']);
      this.getLocalStorage(projectname, projecttype);
    } else if (projecttype == "wind") {
      this._router.navigate(['/wind-tree']);
      this.getLocalStorage(projectname, projecttype);
    } else if (projecttype == "hydro") {
      this._router.navigate(['/hydro']);
      this.getLocalStorage(projectname, projecttype);
    } else if (projecttype == "gis") {
      this._router.navigate(['/gis']);
      this.getLocalStorage(projectname, projecttype);;
    } else if (projecttype == "biomass") {
      this._router.navigate(['/biomass']);
      this.getLocalStorage(projectname, projecttype);
    } else {
      this.snackBar.open("No Project Type", "close", {
        duration: 2000,
      });
    }

  }

  getLocalStorage(projectname, projecttype){
    
    localStorage.setItem('project_name', projectname);
    localStorage.setItem('project_type', projecttype);

    const dataitem = {
      "projectname": projectname,
      "projecttype": projecttype
    }

    localStorage.setItem('project_dataitem', JSON.stringify(dataitem));

  }


  public userLogout() {

    let obj = {};

      this.commonService.getLogout(obj).subscribe(res => {
        if (res['success'] == 1) {
          this.GlobalServices.logout();
          //window.history.go(-2);
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


    this.GlobalServices.removeLocalItem('authentication');
    this.GlobalServices.authenticationFailed();
  }

  ngOnDestroy(): void {
    //alert(`I'm leaving the app!`);
    /* this.GlobalServices.removeLocalItem('authentication')
    this.GlobalServices.authenticationFailed(); */
  }

  /* @HostListener('window:unload', [ '$event' ])
  unloadHandler(event) {
    this.GlobalServices.removeLocalItem('authentication')
    this.GlobalServices.authenticationFailed();
  } */

  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler(event) {
    //alert('By refreshing this page you may lost all data.');
    //this.GlobalServices.removeLocalItem('authentication')
    //this.GlobalServices.authenticationFailed();
  }
}
