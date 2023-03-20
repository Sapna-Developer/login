import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { CommonServices } from '../../services/common-services';
import { GlobalServices } from '../../services/global-services';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.sass']
})
export class ProjectsComponent implements OnInit {


  currentUser: any = {};
  userRoles: any; 
  userLogin: string;
  businessTypes: any = [];
  data: any = {};
  item: any = {};
  constructor(private GlobalServices: GlobalServices, private CommonServices: CommonServices,
    @Inject(MAT_DIALOG_DATA) public data1: any, public dialogRef: MatDialogRef<ProjectsComponent>,
    public dialog: MatDialog, public snackBar: MatSnackBar) {
    //dialogRef.disableClose = true;
    this.currentUser = this.GlobalServices.getLocalItem('authentication', true);
    this.userRoles = this.GlobalServices.rolesdata;
    this.userLogin = localStorage.getItem('username');
    this.getBusiness();
  }

  ngOnInit() {
  }
  dialogClose() {
    this.dialogRef.close();
  }

  getBusiness() {
    this.CommonServices.getBussinessType({}).subscribe(
      res => {
        if (res['success'] == 1) {
          this.businessTypes = res['data'];
        }
      },
      err => {
        console.log(err);
      });
  }

  submitproject(form: NgForm){
    this.item['type'] = this.data.business_type;
    this.item['name'] = this.data.project;
    let obj = {
      data: this.item
    }
    this.CommonServices.projectinsert(obj).subscribe((res:any)=>{
      console.log(res);
      if (res['success'] == 1) {
        this.snackBar.open(res["message"], "close", {
          duration: 2000,
        });
        this.dialogRef.close();
      }
    });
  }
}
