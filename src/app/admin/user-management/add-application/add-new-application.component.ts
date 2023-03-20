import { GlobalServices } from "./../../../services/global-services";
import { Component, OnInit, Inject } from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatSnackBar,
} from "@angular/material";
import { CommonServices } from "../../../services/common-services";
import { FormControl, NgForm } from "@angular/forms";
import { Observable } from "rxjs/Rx";

export interface User {
  employee_id: string;
  usename: string;
  work_email: string;
}

export interface ProjectsView {
  project: string;
}

@Component({
  selector: "app-add-new-application",
  templateUrl: "./add-new-application.component.html",
  styleUrls: ["./add-new-application.component.css"],
})
export class AddUserManagementComponent implements OnInit {
  role: string = "";
  project: string = "";
  username: string = "";
  work_email: string = "";
  employee_id: string = "";
  currentUser: any = {};

  userRoles: any;
  isShowRole: boolean;

  myControl = new FormControl();
  options: User[] = [];
  filteredOptions: Observable<User[]>;
  userLogin: string;
  data: any = {};

  constructor(
    private GlobalServices: GlobalServices,
    private CommonServices: CommonServices,
    @Inject(MAT_DIALOG_DATA) public data1: any,
    public dialogRef: MatDialogRef<AddUserManagementComponent>,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {
    //dialogRef.disableClose = true;
    this.currentUser = this.GlobalServices.getLocalItem("authentication", true);
    this.userRoles = this.GlobalServices.rolesdata;

    this.userLogin = localStorage.getItem("username");
  }

  addApplication(form: NgForm) {
    if (form.invalid) {
      return false;
    }

    this.CommonServices.addAppln(this.data).subscribe(
      (res) => {
        if (res["success"] == 1) {
          this.snackBar.open(res["message"], "close", {
            duration: 2000,
          });
          this.dialogRef.close();
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
  ngOnInit() {}

  dialogClose() {
    this.dialogRef.close();
  }
}
