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
  aufgabenstellung = true;
  studloesung = true;
  inhaltcenter = false;
  impressum = false;
  startseite = true;
  bewertung = false;
  musterloeusung = false;
  unitantwort = false;

  constructor(public dialog: MatDialog,
              private jopsApiRunService: JopsApiRunService,
              private jopsApiLoginService: JopsApiLoginService) {
    if (localStorage.getItem('sessionId') === null || localStorage.getItem('sessionId') === undefined) {
      // this.openDialog();                         // ################################## auskommentieren, um Loginfenster zu bekommen
    }
  }

  onClickUnit() {
    this.unitantwort = true;
  }

  onClickComment() {
    this.bewertung = false;
  }

  onClickmusterl() {
    this.musterloeusung = true;
  }

  onClickBewert() {
    this.bewertung = true;
  }

  onClickHaupt() {
    this.inhaltcenter = false;
    this.impressum = false;
    this.startseite = true;
  }

  onClickAufg() {
    this.inhaltcenter = true;
    this.impressum = false;
    this.startseite = false;
  }

  onClickImp() {
    this.inhaltcenter = false;
    this.impressum = true;
    this.startseite = false;
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

  async doLogin() {
    await this.jopsApiLoginService.login(this.myForm);
    if (localStorage.getItem('sessionId') === null || localStorage.getItem('sessionId') === undefined) {
      this.openDialog();
    }
  }

  doLogout() {
    this.jopsApiLoginService.logout();
    this.openDialog();
  }
}
