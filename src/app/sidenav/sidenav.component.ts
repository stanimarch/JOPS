import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDrawerContainer} from '@angular/material';
import {DialogOverviewComponent} from '../dialog-overview/dialog-overview.component';
import {JopsApiLoginService} from '../jops-api/jops-api-login.service';
import {JopsApiRunService} from '../jops-api/jops-api-run.service';
import {HeaderArray, MenuService} from '../menu/menu.service';
import {JopApiDbService} from '../jops-api/jop-api-db.service';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']

})
export class SidenavComponent implements OnInit {
  @ViewChild('sidenav') public myNav;

  panelOpenState: boolean;
  menuData: Array<HeaderArray>;
  isMenu: boolean;
  menuNeu: number;

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
              private jopApiDbService: JopApiDbService,
              private menuService: MenuService) {
    if (localStorage.getItem('sessionId') === null ||
      localStorage.getItem('sessionId') === undefined ||
      localStorage.getItem('matrNr') === null ||
      localStorage.getItem('matrNr') === undefined) {
      this.panelOpenState = true;
      // this.openDialog();                         // ################################## auskommentieren, um Loginfenster zu bekommen
    }
  }

  ngOnInit() {
    this.menuData = this.menuService.getData();
    this.isMenu = false;
    this.menuNeu = -1;
  }

  menuJava1() {
    if (this.menuNeu === 1) {
      this.myNav.open();
    } else if (this.menuNeu) {

    }


    this.getJava1().then(res => {
      console.log('menuJava1(): alles ist OK');
      this.menuData = this.menuService.dataJava1;
      this.isMenu = true;
    }).catch(msg => {
      console.log('menuJava1(): alles ist nicht OK');
      this.myNav.close();
    });

  }

  getJava1() {
    return new Promise((resolve, reject) => {
      this.jopApiDbService.java1().then(res => {
        console.log('getJava1(): alles ist OK');
        resolve();
      }).catch(msg => {
        console.log('getJava1(): alles ist nicht OK');
        reject();
      });
    });
  }


  onClickUnit() {
    this.unitantwort = true;
  }

  onClickComment() {
    this.kommentar = true;
  }

  onClickCommentClose() {
    this.kommentar = false;
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

  onClick_2() {
    console.log(this.myNav.opened);
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
