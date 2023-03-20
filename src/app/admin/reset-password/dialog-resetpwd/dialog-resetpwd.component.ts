import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-dialog-resetpwd',
  templateUrl: './dialog-resetpwd.component.html',
  styleUrls: ['./dialog-resetpwd.component.css']
})
export class DialogResetPwdComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogResetPwdComponent>) {
    dialogRef.disableClose = true;
  }

  public confirmMessage:string;
  public note: string;

  ngOnInit() {
  }

}
