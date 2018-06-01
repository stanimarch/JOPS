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
  }

  onSubmit() {
    this.jopsApiLoginService.doPostLogin_global(this.myForm);
    this.myForm.reset();
    this.dialogRef.close();
  }
}
