import { GlobalServices } from './../../services/global-services';
import { CommonServices } from './../../services/common-services';
import { Router } from '@angular/router';
import { MenuService } from '../menu.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: "app-root",
  templateUrl: "./root.component.html",
  styleUrls: ["./root.component.sass"]
})

export class RootComponent implements OnInit {

  currentUser: any = {};

  project_type: string;

  project_dataitem1: any;
  project_dataitem: any;

  sideMenu: boolean = false;
  
  purTransMenu: boolean = false;
  purReportsMenu: boolean = false;
  mobileMenu: boolean = false;
  inventoryMenu: boolean = false;
  settingsMenu: boolean = false;
  purchasingMenu: boolean = false;
  inventoryTransMenu:boolean = false;
  inventoryReportsMenu:boolean = false;
  inventoryMasterDataMenu:boolean = false;

  currentSideMenu:boolean=false;
  gisMenuItem: boolean=false;
  windMenuItem: boolean=false;
  solarMenuItem: boolean=true;
  hydroMenuItem: boolean=false;

  constructor(public snackBar: MatSnackBar, private router: Router, private menuService: MenuService, private commonService: CommonServices, private GlobalServices: GlobalServices) {
    
  }

  ngOnInit() {
    
    this.currentUser = this.GlobalServices.getLocalItem('authentication',true)['data'];

    this.project_type = localStorage.getItem('project_type');

    if(this.project_type == "solar"){
      this.solarMenuItem=true;
      this.gisMenuItem=false;
      this.windMenuItem=false;
      this.hydroMenuItem=false; 
    }else if(this.project_type == "wind"){
      this.solarMenuItem=false;
      this.gisMenuItem=false;
      this.windMenuItem=true;
      this.hydroMenuItem=false;
    } else if(this.project_type == "hydro"){
      this.solarMenuItem=false;
      this.gisMenuItem=false;
      this.windMenuItem=false;
      this.hydroMenuItem=true;
    }else if(this.project_type == "gis"){
      this.solarMenuItem=false;
      this.gisMenuItem=true;
      this.windMenuItem=false;
      this.hydroMenuItem=false;
    }else if(this.project_type == "biomass"){
      this.solarMenuItem=false;
      this.gisMenuItem=true;
      this.windMenuItem=false;
      this.hydroMenuItem=false;
    }
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
 
  toggleSide() {
    this.sideMenu = !this.sideMenu;
  }
  logoClick(){
    let domain = this.GlobalServices.getLocalItem('domain', true)
    window.location.href = domain;
  }
  
  toggleMobileMenu() {
    this.mobileMenu = !this.mobileMenu;
  }
}
