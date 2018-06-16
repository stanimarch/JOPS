import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material';
import {DialogOverviewComponent} from '../dialog-overview/dialog-overview.component';
import {JopsApiLoginService} from '../jops-api/jops-api-login.service';
import {JopsApiRunService} from '../jops-api/jops-api-run.service';
import {HeaderArray, MenuService} from '../menu/menu.service';
import {Aufgabe, JopApiDbService, SThemaResponse} from '../jops-api/jop-api-db.service';
import {HttpClient} from '@angular/common/http';
import {FormControl, FormGroup} from '@angular/forms';
import {Validators} from '@angular/forms';

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

  commentForm: FormGroup;
  studLoesungForm: FormGroup;

  aufgabe: Aufgabe;

  aufgabenstellung = true;
  studloesung = true;
  inhaltcenter = false;
  impressum = false;
  startseite = true;
  kommentar = false;
  musterloeusung = false;
  unitantwort = false;
  spinner_obAufgabeLaden = false;
  spinner_commenter = false;
  spinner_unittest = false;

  testArray: Array<HeaderArray>;

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
    this.testArray = [];
    this.menuAktuell = -1;
    this.dataJava1 = null;
    this.dataJava2 = null;
    this.aufgabe = new Aufgabe(
      101,
      'For-Schleife',
      'Schterenaufgabe',
      'Titel von der Aufgabe',
      20,
      'Schreiben Sie ein Programm, das ein durch Sternchen gefülltes Rechteck zeichnet. Der Benutzer\n' +
      'soll Breite und Höhe eingeben können:\n' +
      'Geben Sie die Breite des Rechtecks ein: 20\n' +
      'Geben Sie die Höhe des Rechtecks ein: 5\n' +
      '********************\n' +
      '********************\n' +
      '********************\n' +
      '********************\n' +
      '******************** ',
      '',
      null,
      'public class SternchenRechteckGefuellt {\n' +
      'public static void main(String[] args) throws IOException {\n' +
      ' final BufferedReader konsolenEingabe = new BufferedReader(\n' +
      ' new InputStreamReader(System.in));\n' +
      ' System.out.print("Geben Sie die Breite des Rechtecks ein: ");\n' +
      ' final int breite= Integer.parseInt(konsolenEingabe.readLine());\n' +
      ' System.out.print("Geben Sie die Höhe des Rechtecks ein: ");\n' +
      ' final int hoehe = Integer.parseInt(konsolenEingabe.readLine());\n' +
      ' for (int y = 0; y < hoehe; y++) {\n' +
      ' wiederholeZeichen(breite, \'*\');\n' +
      ' System.out.println();\n' +
      ' }\n' +
      ' }\n' +
      'static void wiederholeZeichen(final int breite, char c) {\n' +
      ' for (int x = 0; x < breite; x++) {\n' +
      ' System.out.print(c);\n' +
      ' }\n' +
      ' }\n' +
      '} ',
      3,
      15,
      null
    );
    this.commentForm = new FormGroup({
      comment: new FormControl(),
      email: new FormControl('', [Validators.required, Validators.email])
    });
    this.studLoesungForm = new FormGroup({
      loesungstext: new FormControl(),
      erreichtePunkte: new FormControl('', [Validators.min(0), Validators.max(this.aufgabe.maxPunkte)]),
      schwierigkeit: new FormControl('3')
    });
  }

  getErrorMessagePunkte() {
    return this.studLoesungForm.get('erreichtePunkte').hasError('min') ? 'Minimum 0 ' :
      this.studLoesungForm.get('erreichtePunkte').hasError('max') ? `Maximum ${this.aufgabe.maxPunkte}` :
        '';
  }

  test() {
    console.log('######### TEST()   => ' + JSON.stringify(this.aufgabe.valueOf()));
  }

  postUnittest() {
    console.log('##### 1. ANFANG: postUnittest(code: string)');
    return new Promise((resolve, reject) => {
      this.jopApiDbService.postUnittest(this.aufgabe.id.toString(), this.aufgabe.loesungStud, this.aufgabe.titel, this.aufgabe.unittest)
        .then(res => {
          console.log('##### 2. ENDE: postUnittest(code: string): Alles ist GUT!');
          this.aufgabe.unittestAusgabe = 'OUTPUT:\n' + this.jopApiDbService.unittestResponse.output
            + '\n\nERRORS:\n' + JSON.stringify(this.jopApiDbService.unittestResponse.errors.valueOf());
          this.spinner_unittest = false;
        })
        .catch(msg => {
          console.log('##### 2. ENDE: postUnittest(code: string): Alles ist SCHLECHT!');
          this.spinner_unittest = false;
          this.unitantwort = false;
        });
    });
  }

  onClickLoesungSpeichern() {
    console.log('########## 1. onClickLoesungSpeichern(); ');
  }

  onClickCommentSenden() {
    console.log('########## 1. onClickCommentSenden();');
    console.log('########## 2. this.commentForm.get(\'comment\').value: ' + this.commentForm.get('comment').value);
    console.log('########## 3. this.commentForm.get(\'email\').value: ' + this.commentForm.get('email').value);
    this.commentSenden('Email: ' + this.commentForm.get('email').value + '\nTEXT:\n' + this.commentForm.get('comment').value);
  }

  commentSenden(comment: string) {
    console.log('########## 4. commentSenden(text: string);');
    console.log('########## 5. this.jopApiDbService.commentSenden(comment, this.aufgabe.id)... ');
    this.spinner_commenter = true;
    this.jopApiDbService.commentSenden(comment, this.aufgabe.id)
      .then(res => {
        console.log('########## 6. abgeschlossen: OK');
        this.spinner_commenter = false;
        this.commentForm.reset();
        this.onClickCommentClose();
      })
      .catch(msg => {
        console.log('########## 6. abgeschlossen: nicht OK');
        this.spinner_commenter = false;
      })
    ;
  }

  aufgabeHolen(id: number) {
    console.log('@@@@@ 1. aufgabeHolen(' + id + ');');
    this.inhaltcenter = false;
    this.impressum = false;
    this.startseite = false;
    this.kommentar = false;
    this.spinner_obAufgabeLaden = true;
    this.getAufgabe(id);
  }

  getAufgabe(id: number) {
    console.log('@@@@@ 2. getAufgabe(' + id + ')');

    if (this.jopApiDbService.istAufgebe(id)) {
      this.aufgabe = this.jopApiDbService.getAufgabe(id);
      this.spinner_obAufgabeLaden = false;
      this.inhaltcenter = true;
      console.log('@@@@@ 3.  this.jopApiDbService.istAufgebe(id) = TRUE');
    } else {
      console.log('@@@@@ 3.  this.jopApiDbService.istAufgebe(id) = FALSE');
      this.jopApiDbService.getAufgabePOST(id)
        .then(res => {
          console.log('########## VOR FEHLER ==> this.aufgabe = this.jopApiDbService.getAufgabe(id);');
          this.aufgabe = this.jopApiDbService.getAufgabe(id);
          this.studLoesungForm.get('loesungstext').setValue(this.aufgabe.loesungStud);
          this.studLoesungForm.get('erreichtePunkte').setValue(this.aufgabe.erreichtePunkte);
          this.spinner_obAufgabeLaden = false;
          this.inhaltcenter = true;
          console.log('########## getAufgabe(id: number) => Alles ist gut!');
        })
        .catch(msg => {
          console.log('########## getAufgabe(id: number) => Fehler!!! ');
        });
    }
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

  getErrorMessage() {
    /*return this.email.hasError('required') ? 'Bitte E-Mail eingeben' :*/
    return this.commentForm.get('email').hasError('email') ? 'Keine gültige E-Mail' :
      '';
  }


  onClickUnit() {
    this.unitantwort = true;
    this.spinner_unittest = true;
    this.postUnittest();
  }

  onClickComment() {
    this.kommentar = true;
  }

  onClickCommentClose() {
    this.kommentar = false;
    this.commentForm.reset();
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
    this.spinner_obAufgabeLaden = false;
  }

  onClickImp() {
    this.inhaltcenter = false;
    this.impressum = true;
    this.startseite = false;
  }

  onClick() {
  }

  onClick_2() {
    this.http.get<SThemaResponse>('./api/2')
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
