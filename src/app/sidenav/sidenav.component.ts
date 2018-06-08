import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDrawerContainer} from '@angular/material';
import {DialogOverviewComponent} from '../dialog-overview/dialog-overview.component';
import {JopsApiLoginService} from '../jops-api/jops-api-login.service';
import {JopsApiRunService} from '../jops-api/jops-api-run.service';
import {HeaderArray, MenuService, UrdatenType} from '../menu/menu.service';
import {JopApiDbService, SThemaResponse} from '../jops-api/jop-api-db.service';
import {HttpClient} from '@angular/common/http';
import {FormControl, FormGroup} from '@angular/forms';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']

})
export class SidenavComponent implements OnInit {
  @ViewChild('sidenav') public myNav;

  menuAktuell: number;
  dataJava1: Array<HeaderArray>;
  dataJava2: Array<HeaderArray>;

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
              private menuService: MenuService,
              private http: HttpClient) {
    if (localStorage.getItem('sessionId') === null ||
      localStorage.getItem('sessionId') === undefined ||
      localStorage.getItem('matrNr') === null ||
      localStorage.getItem('matrNr') === undefined) {
      // this.openDialog();                         // ################################## auskommentieren, um Loginfenster zu bekommen
    }
  }

  ngOnInit() {
    this.menuAktuell = -1;
    this.dataJava1 = null;
    this.dataJava2 = null;
  }

  menuJava1() {
    if (!this.myNav.opened) {
      if (this.dataJava1 !== null) {
        this.menuAktuell = 1;
        this.myNav.open();
      } else {
        this.menuAktuell = -1;
        this.myNav.open();
        this.buildJava1Data()
          .then(res => {
            // console.log('menuJava1(): alles ist OK');
            this.menuAktuell = 1;
            this.myNav.open();
          })
          .catch(msg => {
            // console.log('menuJava1(): alles ist nicht OK');
            this.myNav.close();
          });
      }
    } else { // opened
      if (this.menuAktuell === 1) {
        this.myNav.close();
      } else if (this.dataJava1 !== null) {
        this.menuAktuell = 1;
      } else {
        this.menuAktuell = -1;
        this.buildJava1Data()
          .then(res => {
            // console.log('menuJava1(): alles ist OK');
            this.menuAktuell = 1;
          })
          .catch(msg => {
            // console.log('menuJava1(): alles ist nicht OK');
            this.myNav.close();
          });
      }
    }
  }

  buildJava1Data() {
    return new Promise((resolve, reject) => {
      this.jopApiDbService.buildJava1()
        .then(res => {
          this.dataJava1 = this.menuService.dataJava1;
          resolve();
        }).catch(msg => {
        reject();
      });
    });
  }

  menuJava2() {
    if (!this.myNav.opened) {
      if (this.dataJava2 !== null) {
        this.menuAktuell = 2;
        this.myNav.open();
      } else {
        this.menuAktuell = -1;
        this.myNav.open();
        this.buildJava2Data()
          .then(res => {
            // console.log('menuJava2(): alles ist OK');
            this.menuAktuell = 2;
            this.myNav.open();
          })
          .catch(msg => {
            // console.log('menuJava2(): alles ist nicht OK');
            this.myNav.close();
          });
      }
    } else { // opened
      if (this.menuAktuell === 2) {
        this.myNav.close();
      } else if (this.dataJava2 !== null) {
        this.menuAktuell = 2;
      } else {
        this.menuAktuell = -1;
        this.buildJava2Data()
          .then(res => {
            // console.log('menuJava2(): alles ist OK');
            this.menuAktuell = 2;
          })
          .catch(msg => {
            // console.log('menuJava2(): alles ist nicht OK');
            this.myNav.close();
          });
      }
    }
  }

  buildJava2Data() {
    return new Promise((resolve, reject) => {
      this.jopApiDbService.buildJava2()
        .then(res => {
          this.dataJava2 = this.menuService.dataJava2;
          resolve();
        }).catch(msg => {
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
    this.http.get<SThemaResponse>('./api/1')
      .toPromise()
      .then((res) => {
        console.log(JSON.stringify(res.response));
      }).catch(msg => {
      console.log('########## Error by http.get(): ' + msg);
    });
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

/*
res.forEach((data, index) => {
  console.log('Index: ' + index + 'data: ' + data.toString());
*/
