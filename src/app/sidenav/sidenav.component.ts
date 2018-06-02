import {Component} from '@angular/core';
import {MatDialog} from '@angular/material';
import {DialogOverviewComponent} from '../dialog-overview/dialog-overview.component';
import {JopsApiLoginService} from '../jops-api/jops-api-login.service';
import {JopsApiRunService} from '../jops-api/jops-api-run.service';
import {FormGroup} from '@angular/forms';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']

})
export class SidenavComponent {
  fillerNav = Array(10).fill(0).map((_, i) => `Aufgabe  ${i + 1}`);
  myForm: FormGroup;

  constructor(public dialog: MatDialog,
              private jopsApiRunService: JopsApiRunService,
              private jopsApiLoginService: JopsApiLoginService) {
    if (localStorage.getItem('sessionId') === null || localStorage.getItem('sessionId') === undefined) {
      this.openDialog();
    }
  }

  onClickHaupt() {
    document.getElementById('start').style.display = 'block';
    document.getElementById('mitte').style.display = 'none';
    document.getElementById('impressum').style.display = 'none';
  }

  onClickAufg() {
    document.getElementById('start').style.display = 'none';
    document.getElementById('mitte').style.display = 'block';
    document.getElementById('impressum').style.display = 'none';
  }

  onClickImp() {
    document.getElementById('impressum').style.display = 'block';
    document.getElementById('mitte').style.display = 'none';
    document.getElementById('start').style.display = 'none';
  }

  onClick() {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewComponent, {
      width: '250px'
      /*,
      data: {
        doOpenDialog: this.doOpenDialog,
        myForm: this.myForm
      }*/
    });

    dialogRef.afterClosed().subscribe(result => {
      this.myForm = result;
      console.log(JSON.stringify(this.myForm.value));
      this.doLogin();
    });
  }

  doLogin(): void {
    if (!this.jopsApiLoginService.login(this.myForm)) {
      this.openDialog();
    }
  }

  doLogout() {
    this.jopsApiLoginService.logout();
    this.openDialog();
  }
}
