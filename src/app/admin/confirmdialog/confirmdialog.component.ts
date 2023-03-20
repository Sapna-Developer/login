import { CommonServices } from '../../services/common-services';
import { Router } from '@angular/router';
import { GlobalServices } from '../../services/global-services';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-confirmdialog',
  templateUrl: './confirmdialog.component.html',
  styleUrls: ['./confirmdialog.component.sass']
})
export class ConfirmdialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ConfirmdialogComponent>,
    private commonService: CommonServices,
    private _router: Router,
    public globalService: GlobalServices,
    @Inject(MAT_DIALOG_DATA) public data) {
    //dialogRef.disableClose = true;
  }

  public confirmMessage: string;
  public note: string;

  ngOnInit() {

  }

  confirm() {
    this.commonService.deleteUserManagement(this.data).subscribe(res => {
      if (res["success"] == 1) {
        this.globalService.showSuccessMessage(res['message']);
        this.dialogRef.close(true);
      } else {
        this.globalService.showSuccessMessage(res['message']);
        this.dialogRef.close(true);
      }
    },
    err => {
      console.log(err);
    });

  }

}
