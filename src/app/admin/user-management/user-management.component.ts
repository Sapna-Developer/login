import { startWith, map } from 'rxjs/operators';
import { MatPaginator, MatDialog, MatSnackBar } from '@angular/material';
import { AddGuestUserComponent } from './add-guest-user/add-guest-user.component';
import { CommonServices } from './../../services/common-services';
import { GlobalServices } from './../../services/global-services';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmdialogComponent } from '../confirmdialog/confirmdialog.component';
import { AddUserManagementComponent } from './add-application/add-new-application.component';
import { GuestUserListComponent } from './guest-user-list/guest-user-list.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, NgForm } from '@angular/forms';
import { ProjectsComponent } from '../projects/projects.component';

export interface User {
  employee_id: string;
  usename: string;
  work_email: string;
}

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.sass']
})

export class UserManagementComponent implements OnInit {
 
  displayedColumns: string[] = ['appname','username', 'email', 'role', 'business_type', 'project', 'action'];
  dataSource: any = [];

  businessTypes: any = [];

  breakpoint: number;

  data: any = {};
  model: string;
  currentUser: any;
  userRoles: any;
  appLists: any = [];
  projList: any = [];
  roleLists: any = [];
  users: Observable<any[]>;
  myControl = new FormControl();
  options: any = []
  employee_id: any;
  username: any;
  work_email: any;
  showError: boolean;
  atob_url: string;

  appsMenu: boolean;
  menuList: any;

  role: any;
  app_name: any;

  bol_Application: boolean = true;
  bol_user: boolean = true;
  bol_Roles: boolean = true;
  bol_Business_type: boolean = true;
  bol_Plants: boolean = true;
  filteredOptions: Observable<any>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  error_msg: string = "Loading"


  constructor(
    private commonService: CommonServices,
    private _router: Router,
    public globalService: GlobalServices,
    public dialog: MatDialog,
    public route: ActivatedRoute,
    public snackBar: MatSnackBar
  ) {

    this.route.queryParams.subscribe(params => {
      if (params['redirect'] == undefined) {

      } else {
        this.atob_url = atob(params['redirect']);
        localStorage.setItem('redirect', this.atob_url);
      }
    });

    this.currentUser = this.globalService.getLocalItem('authentication', true)['data'];
    this.userRoles = this.globalService.rolesdata;
    this.role = this.currentUser['app_details']['roles'];
    this.app_name = this.currentUser['app_details']['app_name'];
    this.getMenuList();
    this.getBusiness();
    this.appList();
    this.rolesList();
    this.userRolesAuthorizations(null);

    console.log(this.currentUser);
  }

  displayFn(user) {
  
    return user;
  }

  dataChanged(newObj) {
    if(newObj.length > 2){
    let obj = {
      "username_given": newObj || ''
    }
    this.commonService.getUserlists(obj).subscribe(
      res => {
        if (res['success'] == 1) {
          this.options = res['data'];
        }else{
          this.options = [];
        }
      },
      err => {
        console.log(err);
      });
    }
  }

  ngOnInit() {

    this.breakpoint = (window.innerWidth <= 400) ? 1 : 2;

    // this.users = this.myControl.valueChanges
    //   .pipe(
    //     startWith(''),
    //     map(value => typeof value === 'string' ? value : value.usename),

    //     map(name => name ? this._filter(name) : this.options.slice())
    //   );

  //   this.filteredStates = this.stateCtrl.valueChanges
  // .startWith(null)
  // .debounceTime(400)
  // .do(value => {
  //   this.commonService.getUserlists(value).then( res => {
  //     console.log(res, 'oi');
  //     this.states = res;
  //   })
  // })
  // .subscribe()
  // }

  this.users = this.myControl.valueChanges
  .pipe(
    startWith(''),
    map(value => this._filter(value))
  );


  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 400) ? 1 : 2;
  }

  public getBusiness() {
    this.commonService.getBussinessType({}).subscribe(
      res => {
        if (res['success'] == 1) {
          this.businessTypes = res['data'];
        }
      },
      err => {
        console.log(err);
      });
  }

  openUserMngt(): void {
    const dialogRef = this.dialog.open(AddUserManagementComponent, {
      width: '450px',
      disableClose: true,
      autoFocus: true,
      data: ""
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  openprojectList(): void {
    const dialogRef = this.dialog.open(ProjectsComponent, {
      width: '20%',
      height: '40%',
      disableClose: true,
      autoFocus: true,
      data: ""
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  openGuestUser(): void {
    const dialogRef = this.dialog.open(AddGuestUserComponent, {
      width: '500px',
      data: ""
    });
    dialogRef.afterClosed().subscribe(result => {

    });
  }

  openGuestUserList(): void {
    const dialogRef = this.dialog.open(GuestUserListComponent, {
      width: "70%",
      height: "90%",
      data: ""
    });
    dialogRef.afterClosed().subscribe(result => {

    });
  }

  showdiv() {
    this.appsMenu = !this.appsMenu;
  }

  getMenuList(): void {
    let obj = {
      "app_name": ""
    }
    this.commonService.getMenulist(obj).subscribe(res => {
      if (res['success'] == '1') {
        this.menuList = res['details'];
      }
    },
      err => {
        console.log(err);
      });
  }

  getMenuID(app_name) {
    let obj = {
      "app_name": app_name
    }
    this.commonService.getAppUrl(obj).subscribe(res => {

      if (res['success'] == '1') {
        let app_id = res['data']['app_details']['app_id'];
        let app_url = res['data']['app_details']['app_url'];

        let btoa_data = btoa(JSON.stringify(res));
        let atob_token = atob(btoa_data);

        window.location.href = app_url + "/reload?code=" + app_id + "&response_type=" + btoa_data + "&redirect_uri=" + this.globalService.parentDomain;

        /* //global server
        if (app_name != "FPA") {
          window.location.href = app_url + "/reload?code=" + app_id + "&response_type=" + btoa_data + "&redirect_uri=" + this.parentDomain;
        } else {
          this.snackBar.open("Coming Soon..", "close", {
            duration: 2000,
          });
        } */

      } else if (res['success'] == '0') {
        this.snackBar.open(res['message'], "close", {
          duration: 2000,
        });
      }
    },
      err => {
        console.log(err);
      });
  }

  public appList() {
    this.commonService.appList({}).subscribe(
      res => {
        if (res['success'] == 1) {
          this.appLists = res['data'];
        }
      },
      err => {
        console.log(err);
      });
  }

  public selectApp(appname) {
    let obj = {
      'app_name': appname,
    }

    this.commonService.getEnableCombinations(obj).subscribe(
      res => {
        if (res['success'] == 1) {

          /* let application = res["data"].Applications;
          let user = res["data"].user;
          let Roles = res["data"].Roles;
          let Business_type = res["data"].Business_type;
          let Plants = res["data"].Plants; */

          //console.log("application=" + application, "user=" + user, "Roles=" + Roles, "Business_type=" + Business_type, "Plants=" + Plants);

          this.bol_Application = res["data"].Applications;
          this.bol_user = res["data"].user;
          this.bol_Roles = res["data"].Roles;
          this.bol_Business_type = res["data"].Business_type;
          this.bol_Plants = res["data"].Plants;

        
        } else {

        }
      },
      err => {
        console.log(err);
      });
  }

  public selectProjectList(data) {

    this.data['project'] = ""

    let type = data.business_type;

    let businesstype;
    if(type == "all"){
      businesstype = "";
    }else{
      businesstype = data.business_type;
    }

    console.log(businesstype)


    let obj1 = {
      'app_name': data.app_name || '',
      'project': '',
      'role': '',
      'business_type': businesstype,
      'username': data.username || ''
    }

    if (this.data['role'] != undefined) {
      obj1 = {
        'app_name': data.app_name || '',
        'project': '',
        'role': this.data['role'],
        'business_type': businesstype,
        'username': data.username || ''
      }
    } else {
      obj1 = {
        'app_name': data.app_name || '',
        'project': '',
        'role': '',
        'business_type': businesstype,
        'username': data.username || ''
      }
    }

    this.userRolesAuthorizations(obj1);


    let obj = {
      'app_name': data.app_name || '',
      'business_type': businesstype || ''
    }

    this.commonService.projectList(obj).subscribe(
      res => {
        if (res['success'] == 1) {
          this.projList = res['data'];
          console.log(res['data'])
        } else {
          this.projList = [];
        }
      },
      err => {
        console.log(err);
      });
  }

  public rolesList() {
    this.commonService.rolesList({}).subscribe(
      res => {
        if (res['success'] == 1) {
          this.roleLists = res['data'];
        }
      },
      err => {
        console.log(err);
      });
  }

  public userRolesAuthorizations(data) {

    this.error_msg = "Loading..";
   
    let obj = {}
    if (data != undefined || data != null) {
      data = {
        'project': data['project'] || '',
        'role': data['role'] || '',
        'app_name': data['app_name'] || '',
        'business_type': data['business_type'] || '',
        'username': data['username'] || ''
      }
      obj = { data }
    }
    else {
      data = {
        'project': '',
        'role': '',
        'app_name': '',
        'business_type': '',
        'username': ''
      }
      obj = { data }
    }

    this.commonService.getUserAuthRoles(obj).subscribe(
      res => {
        if (res['success'] == 1) {
          this.dataSource = res['data'];
          console.log(this.data)
          if(this.dataSource.length == 0){
            this.error_msg = "No Records Found"
          }
        }else{
          this.dataSource = [];
          this.error_msg = "No Records Found"
        }
      },
      err => {
        console.log(err);
      });
  }

  delete(obj) {
    console.log(obj);
    let params = {
      'business_type': obj.BUSINESS_TYPE || '',
      'project': obj.PROJECT || '',
      'role': obj.ROLE || '',
      'app_name': obj.APP_NAME || '',
      'work_email': obj.WORK_EMAIL || ''
    }
    let obj1 = { params }

    console.log(obj1);

    const dialogRef = this.dialog.open(ConfirmdialogComponent, {
      data: obj1
    });
    dialogRef.afterClosed().subscribe(result => {
      this.data = {};
      this.userRolesAuthorizations(null);
    });
  }

  // private _filter(name: string): User[] {
  //   const filterValue = name.toLowerCase();
  //   return this.options.filter(option => option.usename.toLowerCase().indexOf(filterValue) === 0);
  // }
  private _filter(value: string) {
     const filterValue = value.toLowerCase();
    
    return this.options.filter(option => option.usename.toLowerCase().includes(filterValue) ||  option.work_email.toLowerCase().includes(filterValue));
  }
  submit(form: NgForm) {

    if (form.invalid) {
      return false
    }

    this.data['employee_id'] = this.employee_id;
    this.data['work_email'] = this.work_email;

    let obj = {
      data: this.data
    }
    this.commonService.addUser(obj).subscribe(
      res => {

        if (res['success'] == 1) {
          //this.data = {};
          form.resetForm();
          this.globalService.showSuccessMessage(res['message']);
          this.userRolesAuthorizations(null);
          this.data.username = "";
          //this.getUsers();
        } else {
          form.resetForm();
          this.globalService.showSuccessMessage(res['message']);
        }
      },
      err => {

        console.log(err);
      });
  }

  selectUsermngtOption(value) {
    this.employee_id = value.employee_id;
    this.username = value.usename;
    this.work_email = value.work_email;


    let data = {
      'business_type': this.data.business_type || '',
      'project': this.data.project || '',
      'role': this.data.role || '',
      'app_name': this.data.app_name || '',
      'username': value.usename || ''
    }

    this.userRolesAuthorizations(data);

  }

  logoClick() {
    let redirect_data = this.route.snapshot.queryParams['redirect'];

    if (redirect_data == undefined) {
      window.location.href = this.globalService.parentDomain;
    } else {
      let url = JSON.parse(this.atob_url);

      //localhost server
      //window.location.href = url;

      //global server
      window.location.href = url + "/ui";
    }
  }

  public userLogout() {
    let obj = {};
    this.commonService.getLogout(obj).subscribe(res => {
      if (res['success'] == 1) {
        //localStorage.removeItem('currentUser');
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
    this.globalService.removeLocalItem('authentication');
    this.globalService.authenticationFailed();
  }
}
