import { environment } from "./../../../environments/environment";
import { GlobalServices } from "./../../services/global-services";
import { CommonServices } from "./../../services/common-services";
import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.sass"],
})
export class LoginComponent implements OnInit {
  data: any = {};
  onSubmitLoading: boolean;
  errorMessage: string;
  token: any;
  domain: any;
  url: any;
  apiToken: any;
  logout: any;

  isLoggedIn: boolean = false;
  public redirectUrl: string;
  authData: any;
  currentURL: string;
  currentDomain: string;

  constructor(
    private GlobalServices: GlobalServices,
    private router: Router,
    private commonServices: CommonServices,
    private route: ActivatedRoute,
    public snackBar: MatSnackBar
  ) {
    this.logout = route.snapshot.queryParams["logout"];
    this.errorMessage = "";
    const rememberMeData = this.GlobalServices.getLocalItem("rememberMe", true);
    if (rememberMeData) {
      this.data = rememberMeData;
    }
  }

  ngOnInit() {
    this.currentURL = window.location.href;
    this.currentDomain = window.location.host;
    if (this.logout != undefined) {
      let user = this.GlobalServices.getLocalItem("authentication", true);
      //console.log("Usermngt: "+JSON.stringify(user));

      let obj = {};

      this.commonServices.getLogout(obj).subscribe(
        (res) => {
          if (res["success"] == 1) {
            this.GlobalServices.logout();
            this.snackBar.open(res["message"], "close", {
              duration: 2000,
            });
            this.GlobalServices.removeLocalItem("authentication");
          } else {
            this.snackBar.open(res["message"], "close", {
              duration: 2000,
            });
          }
        },
        (err) => {
          console.log(err);
        }
      );
    }

    if (this.GlobalServices.hasValidIdToken()) {
      this.router.navigate(["/session"]);
    } /* else{
      this.router.navigate(['/login']);
    } */
  }
  getRememberMe() {
    console.log(this.data.remember);
  }
  redirectTo() {
    window.open(
      "http://intranet.greenkogroup.lan/account.do?action=forgot",
      "_blank"
    );
    //window.location.href = "http://intranet.greenkogroup.lan/account.do?action=forgot","_blank"
  }
  loginSubmit(event, form) {
    event.preventDefault();
    if (form.invalid) {
      return false;
    }
    this.onSubmitLoading = true;
    let formObj = form.value;
    let domain = window.location.host;

    let obj = {
      username: formObj.userName,
      password: formObj.password,
      // 'domain': 'testgmh.gits.lan'
      // 'domain': this.currentDomain
      domain: "gee.greenko.net",
    };
    //testgmh.gits.lan
    //gee.greenko.net
    //fpa.greenko.net

    this.GlobalServices.removeLocalItem("rememberMe");

    this.commonServices.userlogin(obj).subscribe(
      (res) => {
        if (res["success"] == "1") {
          this.isLoggedIn = true;
          console.log(this.redirectUrl);
          if (this.redirectUrl) {
            this.router.navigate([this.redirectUrl]);
            this.redirectUrl = null;
          }

          this.GlobalServices.setLocalItem("authentication", res, true);

          localStorage.setItem("currentUser", JSON.stringify(res));
          console.log(localStorage.setItem("currentUser", JSON.stringify(res)));
          this.GlobalServices.init();
          if (formObj.remember) {
            this.GlobalServices.setLocalItem("rememberMe", formObj, true);
          }
          let app_id = res["data"]["app_details"]["app_id"];
          let app_url = res["data"]["app_details"]["app_url"];

          //console.log(res)

          let btoa_data = btoa(JSON.stringify(res));
          let atob_token = atob(btoa_data);

          //xampp server
          //localStorage.setItem('redirect_appurl', 'http://localhost');
          //window.location.href = "http://localhost/"+environment.TITLE+"/reload?code=" + app_id + "&response_type=" + btoa_data + "&redirect_uri=" + this.parentDomain;

          //global server
          // localStorage.setItem('redirect_appurl', app_url);
          // window.location.href = app_url+"/reload?code="+app_id+"&response_type=" + btoa_data + "&redirect_uri=" + this.GlobalServices.parentDomain;

          //local server
          localStorage.setItem("redirect_appurl", "http://localhost:9201");

          window.location.href =
            "http://localhost:9201/reload?code=" +
            app_id +
            "&response_type=" +
            btoa_data +
            "&redirect_uri=" +
            this.GlobalServices.parentDomain;
        } else if (res["success"] == "0") {
          //console.log(res);

          this.errorMessage = res["message"];
        }
        this.onSubmitLoading = false;
      },
      (err) => {
        this.errorMessage = "Unable to connect server";
        console.log(err);
        this.onSubmitLoading = false;
      }
    );
  }
}
