import { environment } from "../../environments/environment";
import { Injectable, OnInit, EventEmitter } from "@angular/core";
import { Router } from '@angular/router';
import * as moment from 'moment';
import _ from 'lodash';
import { MatSnackBar } from "@angular/material";

@Injectable()
export class GlobalServices implements OnInit {
    apiToken = "";
    authentication = null;
    serverDateFormat = "DD-MMM-YYYY HH:MM";
    rolesdata: any = {};

    userRoles: any = {};
    // parentDomain = location.protocol+'//'+location.hostname;
 public  parentDomain = window.location.origin;
//  public currentDomain = location.protocol+'//'+location.hostname+ "/ui";
//    public   parentDomain = location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '');
    public onInvalidApiToken: EventEmitter<any>;
    public onLogOut: EventEmitter<any>;

    constructor(
        private router: Router,
        public snackBar: MatSnackBar
    ) {
        this.init();
        //this.getUserRoles();
        this.onInvalidApiToken = new EventEmitter();
        this.onLogOut = new EventEmitter();
    }

    ngOnInit() {
        // this.removeLocalItem('authentication');
    }

    /**
     * Api Urls
     */
    public ApiUrls() {
        return {
            'userLogin': environment.API_URL + 'login',

            //user management
            'getRoleslist': environment.API_URL + 'roleslist',
            'getaddProjectslist': environment.API_URL + 'addprojectslist',
            'getUserlist': environment.API_URL + 'userlist',
            'addUserManagement': environment.API_URL + 'addUsermngt',
            'deleteUserManagement': environment.API_URL + 'deleteuser',
            'getEnableCombinations': environment.API_URL + 'enable_combinations',

            //Dashboard - create project
            'getDashboardProjectsList': environment.API_URL + 'projectname',
            'mainDashboardlist': environment.API_URL + 'dashboard',
            'sendToken': environment.API_URL + '',
            'appList': environment.API_URL + 'app_list',
            'rolesList': environment.API_URL + 'roles_list',
            'projectList': environment.API_URL + 'project_list',
            'addUser': environment.API_URL + 'adduser',
            'getUserAuthRoles': environment.API_URL + 'rolesuser',
            'getBussinessType': environment.API_URL + 'business_type_list',
            'getLogout': environment.API_URL + 'logout',
            'getMenulist': environment.API_URL + 'application_list',
            'addAppln': environment.API_URL + 'add_application',
            'getAppUrl': environment.API_URL + 'userprojects',
            'addGuestUser': environment.API_URL + 'guest_registration',
            'getGuestUserLists': environment.API_URL + 'guest_list',
            'resend_guestList': environment.API_URL + 'resend_guestemail',
            'setResetpwd': environment.API_URL + 'guest_reset_password',
            'projectinsert' :environment.API_URL + 'project_insert'
            
        }
    }
    invalidApiToken(): void {
        // this.onInvalidApiToken.emit(true);
        this.logoutToken();
    }

    public getCurrentDate = function (format) {
        if (!format) {
            let format = this.serverDateFormat;
        }
        return moment().format(format);
    }

    public formatDate = function (date, format) {
        return moment(date).format(format);
    }

    public isValidDate = function (val, format) {
        if (format) {
            return moment(val, format).isValid();
        } else {
            return moment(val).isValid();
        }
    }

    public checkRole = function (router) {
        return this.userRoles[router];
    }

    hasValidIdToken(): boolean {
        let data = this.getLocalItem('authentication', true);
        return data ? true : false;
    }

    hasValidRoles(): boolean {
        const authentication = this.getLocalItem('authentication', true)['data'];
        //let rolesdata = authentication['app_details']['roles'];
        let show_usermngt = authentication['user_management'];

        if (show_usermngt == "yes") {

            return true;
        } else {

            return false;
        }
    }

    logoutToken(): void {
        this.removeLocalItem('authentication');
        this.router.navigate(['/login']);
        this.snackBar.open("Session Expired! Please login again.", 'Close',
            { duration: 3000, verticalPosition: 'top' });
        this.init();
        localStorage.clear();
    }

    logout(): void {
        this.removeLocalItem('authentication');
        this.removeLocalItem('redirect_appurl');
        this.removeLocalItem('currentUser');
        this.router.navigate(['/login']);
        // localStorage.clear();
        this.init();
    }

    showErrorMessage(err): void {
        let msg;
        if (err && err.errors) {
            msg = err.errors[0].message;
        } else {
            msg = err.message;
        }
        //this.messageService.add({severity: 'error', detail: msg});
    }

    public showSuccessMessage(obj: any) {
        this.snackBar.open(obj, 'Close',
            {
                duration: 3000, verticalPosition: 'top',
                panelClass: ['snack-success']
            })
    }

    public init = function () {
        this.apiToken = "";
        this.authentication = null;
        var data = this.getLocalItem("authentication", true);
        if (data) {
            this.authentication = data['data'];
            this.apiToken = this.authentication['token'];
            this.rolesdata = this.authentication['app_details']['roles'];
        }
    }

    public setLocalItem = function (key, value, encoded) {
        value = JSON.stringify(value);
        if (encoded) {
            value = btoa(value)
        }
        window.localStorage.setItem(key, value);
    }

    public removeLocalItem = function (key) {
        localStorage.removeItem(key);
    }

    public getLocalItem = function (key, decoded) {
        var value = window.localStorage.getItem(key);
        value = (value) ? JSON.parse((decoded) ? atob(value) : value) : null;
        return value;
    }

    public getLoginAuthorization = function (val, domain) {
        val = btoa(val);

        let authorization = {
            'Authorization': 'Token ' + val,
            'domain': domain
        };
        return authorization;
    }

    public getAuthorization = function () {
        let authorization = {
            'Authorization': 'Token ' + this.apiToken,
            'domain' : 'testgeps.greenko.net'
        }
        return authorization;
    }

    public objToQueryString = function (obj) {
        let k = Object.keys(obj);
        let s = "";
        for (var i = 0; i < k.length; i++) {
            s += k[i] + "=" + encodeURIComponent(obj[k[i]]);
            if (i != k.length - 1) s += "&";
        }
        return s;
    };
    public authenticationFailed() {
        this.logout();
    }

}