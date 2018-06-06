import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormGroup, FormControl} from '@angular/forms';
import {JopsApiLoginService} from '../jops-api/jops-api-login.service';

@Component({
  selector: 'app-dialog-overview',
  templateUrl: './dialog-overview.component.html',
  styleUrls: ['./dialog-overview.component.css']
})
export class DialogOverviewComponent implements OnInit {
  hide = true;
  myForm: FormGroup;
  loginForm: boolean;

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private jopsApiLoginService: JopsApiLoginService) {
    dialogRef.disableClose = true;
  }

  ngOnInit() {
    this.myForm = new FormGroup({
      username: new FormControl(),
      password: new FormControl()
    });
    this.loginForm = true;
  }

  onSubmit() {
    this.loginForm = false;
    this.loginFunc().then(res => {
      // console.log('onSubmit(): OK');
    }).catch(msg => {
      // console.log('onSubmit(): nicht OK');
    });
  }

  loginFunc() {
    return new Promise((resolve, reject) => {
      this.jopsApiLoginService.login(this.myForm)
        .then(value => {
          this.loginForm = true;
          this.dialogRef.close();
          resolve();
        }).catch(reason => {
        this.myForm.reset();
        this.loginForm = true;
        reject();
      });
    });
  }
}
