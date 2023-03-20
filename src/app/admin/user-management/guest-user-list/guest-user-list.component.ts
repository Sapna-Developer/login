import { GlobalServices } from './../../../services/global-services';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { CommonServices } from '../../../services/common-services';
import { AddGuestUserComponent } from '../add-guest-user/add-guest-user.component';

@Component({
  selector: 'app-guest-user-list',
  templateUrl: './guest-user-list.component.html',
  styleUrls: ['./guest-user-list.component.css']
})

export class GuestUserListComponent implements OnInit {

  data: any = {};
  currentUser: any = {};
  userLogin: string;

  completed_displayedColumns: string[] = ['usename', 'work_email', 'action'];
  completed_dataSource: any = [];

  pending_displayedColumns: string[] = ['usename', 'work_email', 'action'];
  pending_dataSource: any = [];

  constructor(private GlobalServices: GlobalServices, private CommonServices: CommonServices,
    @Inject(MAT_DIALOG_DATA) public data1: any, public dialogRef: MatDialogRef<GuestUserListComponent>,
    public dialog: MatDialog, public snackBar: MatSnackBar) {
    this.currentUser = this.GlobalServices.getLocalItem('authentication', true);
    this.userLogin = localStorage.getItem('username');

    this.getCompletedUsers();
    this.getPendingUsers();
  }

  public getCompletedUsers() {
    let data = {"level":"completed"}
    this.CommonServices.getGuestUserLists(data).subscribe(
      res =>  {
        if(res['success'] == 1){
          this.completed_dataSource = res['data'];
        }else{
          //this.completed_displayedColumns = [];
     
        }
      } ,
      err => {
        console.log(err);
      });
  }

  openGuestUser(): void {
    const dialogRef = this.dialog.open(AddGuestUserComponent, {
      width: '400px',
      data: ""
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getCompletedUsers();
      this.getPendingUsers();
    });
  }

  public getPendingUsers() {
    let data = {"level":"pending"}
    this.CommonServices.getGuestUserLists(data).subscribe(
      res =>  {
        if(res['success'] == 1){
          this.pending_dataSource = res['data'];
        }else{
          
     
        }
      } ,
      err => {
        console.log(err);
      });
  }

  resendUser(data){
    
    //usename
    let obj = {"id":data.employee_id};
    this.CommonServices.resend_guestList(obj).subscribe(
      res =>  {
        if(res['success'] == 1){
          this.dialogRef.close();
          this.GlobalServices.showSuccessMessage(res['message']);
        }else{
          this.GlobalServices.showSuccessMessage(res['message']);
        }
      } ,
      err => {
        this.dialogRef.close();
        console.log(err);
      });
  }

  dialogClose(){
    this.dialogRef.close();
  }

  ngOnInit() {

  }

 
}
