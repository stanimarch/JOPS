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

  myForm = new FormGroup({
    username: new FormControl('stas'),
    password: new FormControl('password')
  });

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private jopsApiLoginService: JopsApiLoginService) {
    dialogRef.disableClose = true;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.myForm);
    this.jopsApiLoginService.doPostLogin_global(this.myForm);
  }
}
