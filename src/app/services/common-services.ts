import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { GlobalServices } from '../services/global-services';
import { HttpServices } from './http-services';
import { HttpClient } from '@angular/common/http';

@Injectable()

export class CommonServices {

  constructor(private GlobalServices: GlobalServices, private HttpServices: HttpServices, private http: HttpClient, ) {

  }

  userlogin(obj) {
    let url = this.GlobalServices.ApiUrls().userLogin;
    let val = obj.username + ':' + obj.password;
    let header = this.GlobalServices.getLoginAuthorization(val, obj.domain);
    let $request = this.HttpServices.httpLogin(url, header);
    return $request;
  };

  getRoleslist(obj) {
    let url = this.GlobalServices.ApiUrls().getRoleslist;
    return this.HttpServices.httpRequest({ url, method: 'G', ...obj });
  }


  getaddProjectslist(obj) {
    let url = this.GlobalServices.ApiUrls().getaddProjectslist;
    return this.HttpServices.httpRequest({ url, method: 'G', ...obj });
  }


  getUserlists(obj) {
    let url = this.GlobalServices.ApiUrls().getUserlist;
    console.log(url);
    return this.HttpServices.httpRequest({ url, method: 'G', params: obj, ...obj });
  }

  /* getRolesUserlist(obj) {
    let url = this.GlobalServices.ApiUrls().getRolesUserlist;
    return this.HttpServices.httpRequest({ url, method: 'P', data: obj, ...obj });
  } */

  addUserManagement(obj) {
    let url = this.GlobalServices.ApiUrls().addUserManagement;
    return this.HttpServices.httpRequest({ url, method: 'P', data: obj, ...obj });
  }

  getEnableCombinations(obj) {
    let url = this.GlobalServices.ApiUrls().getEnableCombinations;
    return this.HttpServices.httpRequest({ url, method: 'P', data: obj, ...obj });
  }

  deleteUserManagement(obj) {
    let url = this.GlobalServices.ApiUrls().deleteUserManagement;
    let $request = this.HttpServices.httpRequest({ url, method: 'D', params: obj, ...obj });
    return $request;
  }

  getDashboardProjectsList(obj) {
    let url = this.GlobalServices.ApiUrls().getDashboardProjectsList;
    return this.HttpServices.httpRequest({ url, method: 'P', data: obj, ...obj });
  }

  addAppln(obj) {
    let url = this.GlobalServices.ApiUrls().addAppln;
    return this.HttpServices.httpRequest({ url, method: 'P', data: obj, ...obj });
  }

  addGuestUser(obj) {
    let url = this.GlobalServices.ApiUrls().addGuestUser;
    return this.HttpServices.httpRequest({ url, method: 'P', data: obj, ...obj });
  }

  getGuestUserLists(obj) {
    let url = this.GlobalServices.ApiUrls().getGuestUserLists;
    return this.HttpServices.httpRequest({ url, method: 'P', data: obj, ...obj });
  }

  getAppUrl(obj) {
    let url = this.GlobalServices.ApiUrls().getAppUrl;
    return this.HttpServices.httpRequest({ url, method: 'G', params: obj, ...obj });
  }

  resend_guestList(obj) {
    let url = this.GlobalServices.ApiUrls().resend_guestList;
    return this.HttpServices.httpRequest({ url, method: 'G', params: obj, ...obj });
  }

  mainDashboardlist(obj) {
    let url = this.GlobalServices.ApiUrls().mainDashboardlist;
    return this.HttpServices.httpRequest({ url, method: 'G', params: obj, ...obj });
  }

  getLogout(obj) {
    let url = this.GlobalServices.ApiUrls().getLogout;
    return this.HttpServices.httpRequest({ url, method: 'G', ...obj });
  }

  getMenulist(obj) {
    let url = this.GlobalServices.ApiUrls().getMenulist;
    return this.HttpServices.httpRequest({ url, method: 'G', params: obj, ...obj });
  }

  activatelist(obj, activateToken) {
    let url = this.GlobalServices.ApiUrls().getMenulist;
    return this.HttpServices.httpRequest({ url, method: 'G', params: obj, apiToken: activateToken, ...obj });
  }

  getTokenUrl(obj, activateToken) {
    let url = this.GlobalServices.ApiUrls().getAppUrl;
    return this.HttpServices.httpRequest({ url, method: 'G', params: obj, apiToken: activateToken, ...obj });
  }

  sendToken(obj) {
    let url = this.GlobalServices.ApiUrls().sendToken;
    return this.HttpServices.httpRequest({ url, method: 'P', data: obj, ...obj });
  }
  appList(obj) {
    let url = this.GlobalServices.ApiUrls().appList;
    return this.HttpServices.httpRequest({ url, method: 'G', ...obj });
  }
  rolesList(obj) {
    let url = this.GlobalServices.ApiUrls().rolesList;
    return this.HttpServices.httpRequest({ url, method: 'G', ...obj });
  }
  projectList(obj) {
    let url = this.GlobalServices.ApiUrls().projectList;
    return this.HttpServices.httpRequest({ url, method: 'G', params: obj, ...obj });
  }
  addUser(obj) {
    let url = this.GlobalServices.ApiUrls().addUser;
    return this.HttpServices.httpRequest({ url, method: 'P', ...obj });
  }
  getUserAuthRoles(obj) {
    let url = this.GlobalServices.ApiUrls().getUserAuthRoles;
    return this.HttpServices.httpRequest({ url, method: 'P', ...obj });
  }
  
  getBussinessType(obj) {
    let url = this.GlobalServices.ApiUrls().getBussinessType;
    return this.HttpServices.httpRequest({ url, method: 'G', ...obj });
  }
  setResetpwd(obj) {
    let url = this.GlobalServices.ApiUrls().setResetpwd;
    let $request = this.HttpServices.httpResendPwd(url, obj);
    return $request;
  }
  projectinsert(obj) {
    let url = this.GlobalServices.ApiUrls().projectinsert;
    return this.HttpServices.httpRequest({ url, method: 'P', ...obj });
  }

}