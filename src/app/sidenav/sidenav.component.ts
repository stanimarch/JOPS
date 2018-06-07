import {Component} from '@angular/core';
import {MatDialog} from '@angular/material';
import {DialogOverviewComponent} from '../dialog-overview/dialog-overview.component';
import {JopsApiLoginService} from '../jops-api/jops-api-login.service';
import {JopsApiRunService} from '../jops-api/jops-api-run.service';
import {HeaderArray, MenuService} from '../menu/menu.service';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']

})
export class SidenavComponent {
  panelOpenState: boolean;
  menuData: Array<HeaderArray>;

  aufgabenstellung = true;
  studloesung = true;
  inhaltcenter = false;
  impressum = false;
  startseite = true;
  kommentar = false;
  musterloeusung = false;
  unitantwort = false;

  constructor(public dialog: MatDialog,
              private jopsApiRunService: JopsApiRunService,
              private jopsApiLoginService: JopsApiLoginService,
              private menuService: MenuService) {
    if (localStorage.getItem('sessionId') === null ||
      localStorage.getItem('sessionId') === undefined ||
      localStorage.getItem('matrNr') === null ||
      localStorage.getItem('matrNr') === undefined) {
      this.panelOpenState = true;
      // this.openDialog();                         // ################################## auskommentieren, um Loginfenster zu bekommen
      this.menuData = this.menuService.getData();
    }
  }

  onClickUnit() {
    this.unitantwort = true;
  }

  onClickComment() {
    this.kommentar = true;
  }

  onClickmusterl() {
    this.musterloeusung = true;
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

  onClick(id: number) {
    console.log(id);
  }

  openDialog(): void {
    this.dialog.open(DialogOverviewComponent, {
      width: '250px'
    });
  }

  doLogout() {
    this.jopsApiLoginService.logout();
    this.openDialog();
  }
}
