import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material';
import {DialogOverviewComponent} from '../dialog-overview/dialog-overview.component';
import {JopsApiLoginService} from '../jops-api/jops-api-login.service';
import {JopsApiRunService} from '../jops-api/jops-api-run.service';
import {HeaderArray, MenuService} from '../menu/menu.service';
import {Aufgabe, JopApiDbService, MusterLoesung, SThemaResponse} from '../jops-api/jop-api-db.service';
import {HttpClient} from '@angular/common/http';
import {FormControl, FormGroup} from '@angular/forms';
import {Validators} from '@angular/forms';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']

})
export class SidenavComponent {
  @ViewChild('sidenav') public myNav;

  dataJava1: Array<HeaderArray>;
  dataJava2: Array<HeaderArray>;

  commentForm: FormGroup;
  studLoesungForm: FormGroup;

  musterLoesungTEST: MusterLoesung;

  aufgabe: Aufgabe;

  menuAktuell: number;

  start_aufgabe_impres: number;

  kommentar = false;
  unitantwort = false;
  musterloeusung = false;


  spinner_aufgabe = false;
  spinner_commenter = false;
  spinner_unittest = false;


  constructor(public dialog: MatDialog,
              private jopsApiRunService: JopsApiRunService,
              private jopsApiLoginService: JopsApiLoginService,
              private jopApiDbService: JopApiDbService,
              private menuService: MenuService) {

    this.menuAktuell = -1;
    this.start_aufgabe_impres = 1;

    this.dataJava1 = null;
    this.dataJava2 = null;

    this.aufgabe = null;

    this.commentForm = new FormGroup({
      comment: new FormControl(),
      email: new FormControl('', [Validators.required, Validators.email])
    });

    this.studLoesungForm = new FormGroup({
      loesungstext: new FormControl(),
      erreichtePunkte: new FormControl(),
      schwierigkeit: new FormControl()
    });


    if (localStorage.getItem('sessionId') === null ||
      localStorage.getItem('sessionId') === undefined ||
      localStorage.getItem('matrNr') === null ||
      localStorage.getItem('matrNr') === undefined) {
      // this.openDialog();                         // ################################## auskommentieren, um Loginfenster zu bekommen
    }
  }


  TEST_aufgabe_anzeigen() {
    this.musterLoesungTEST = new MusterLoesung('public class SternchenRechteckGefuellt {\n' +
      '   public static void main(String[] args) throws IOException {\n' +
      '     final BufferedReader konsolenEingabe = new BufferedReader(\n' +
      '       new InputStreamReader(System.in));\n' +
      '     System.out.print("Geben Sie die Breite des Rechtecks ein: ");\n' +
      '     final int breite= Integer.parseInt(konsolenEingabe.readLine());\n' +
      '      System.out.print("Geben Sie die Höhe des Rechtecks ein: ");\n' +
      '       final int hoehe = Integer.parseInt(konsolenEingabe.readLine());\n' +
      '       for (int y = 0; y < hoehe; y++) {\n' +
      '         wiederholeZeichen(breite, \'*\');\n' +
      '         System.out.println();\n' +
      '     }\n' +
      '   }\n' +
      '   static void wiederholeZeichen(final int breite, char c) {\n' +
      '     for (int x = 0; x < breite; x++) {\n' +
      '       System.out.print(c);\n' +
      '     }\n' +
      '   }\n' +
      '} ', null);

    const musLoes: Array<MusterLoesung> = [];
    musLoes.push(this.musterLoesungTEST);

    const unittestAusgabe = 'Das ist Unittest-Ausgabe!';

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
      'Schreiben Sie ein Programm, das ein durch Sternchen gefülltes Rechteck zeichnet. Der Benutzer\n' +
      'soll Breite und Höhe eingeben können:\n' +
      'Geben Sie die Breite des Rechtecks ein: 20\n' +
      'Geben Sie die Höhe des Rechtecks ein: 5\n' +
      'Schreiben Sie ein Programm, das ein durch Sternchen gefülltes Rechteck zeichnet. Der Benutzer\n' +
      'soll Breite und Höhe eingeben können:\n' +
      'Geben Sie die Breite des Rechtecks ein: 20\n' +
      'Geben Sie die Höhe des Rechtecks ein: 5\n' +
      'Schreiben Sie ein Programm, das ein durch Sternchen gefülltes Rechteck zeichnet. Der Benutzer\n' +
      'soll Breite und Höhe eingeben können:\n' +
      'Geben Sie die Breite des Rechtecks ein: 20\n' +
      'Geben Sie die Höhe des Rechtecks ein: 5\n' +
      'Schreiben Sie ein Programm, das ein durch Sternchen gefülltes Rechteck zeichnet. Der Benutzer\n' +
      'soll Breite und Höhe eingeben können:\n' +
      'Geben Sie die Breite des Rechtecks ein: 20\n' +
      'Geben Sie die Höhe des Rechtecks ein: 5\n' +
      'Schreiben Sie ein Programm, das ein durch Sternchen gefülltes Rechteck zeichnet. Der Benutzer\n' +
      'soll Breite und Höhe eingeben können:\n' +
      'Geben Sie die Breite des Rechtecks ein: 20\n' +
      'Geben Sie die Höhe des Rechtecks ein: 5\n' +
      'Schreiben Sie ein Programm, das ein durch Sternchen gefülltes Rechteck zeichnet. Der Benutzer\n' +
      'soll Breite und Höhe eingeben können:\n' +
      'Geben Sie die Breite des Rechtecks ein: 20\n' +
      'Geben Sie die Höhe des Rechtecks ein: 5\n' +
      'Schreiben Sie ein Programm, das ein durch Sternchen gefülltes Rechteck zeichnet. Der Benutzer\n' +
      'soll Breite und Höhe eingeben können:\n' +
      'Geben Sie die Breite des Rechtecks ein: 20\n' +
      'Geben Sie die Höhe des Rechtecks ein: 5\n' +
      'Schreiben Sie ein Programm, das ein durch Sternchen gefülltes Rechteck zeichnet. Der Benutzer\n' +
      'soll Breite und Höhe eingeben können:\n' +
      'Geben Sie die Breite des Rechtecks ein: 20\n' +
      'Geben Sie die Höhe des Rechtecks ein: 5\n' +
      '********************\n' +
      '********************\n' +
      '********************\n' +
      '********************\n' +
      '******************** ',
      'not null :)',
      unittestAusgabe,
      'public class SternchenRechteckGefuellt {\n' +
      '   public static void main(String[] args) throws IOException {\n' +
      '     final BufferedReader konsolenEingabe = new BufferedReader(\n' +
      '       new InputStreamReader(System.in));\n' +
      '     System.out.print("Geben Sie die Breite des Rechtecks ein: ");\n' +
      '     final int breite= Integer.parseInt(konsolenEingabe.readLine());\n' +
      '     System.out.print("Geben Sie die Höhe des Rechtecks ein: ");\n' +
      '     final int hoehe = Integer.parseInt(konsolenEingabe.readLine());\n' +
      '     for (int y = 0; y < hoehe; y++) {\n' +
      '       wiederholeZeichen(breite, \'*\');\n' +
      '       System.out.println();\n' +
      '     }\n' +
      '   }\n' +
      '   static void wiederholeZeichen(final int breite, char c) {\n' +
      '       for (int x = 0; x < breite; x++) {\n' +
      '         System.out.print(c);\n' +
      '       }\n' +
      '   }\n' +
      '} ',
      3,
      15,
      musLoes
    );

    this.studLoesungForm.get('loesungstext').setValue(this.aufgabe.loesungStud);
    this.studLoesungForm.get('schwierigkeit').setValue(this.aufgabe.sGrad + '');
    this.studLoesungForm.get('erreichtePunkte').setValue(this.aufgabe.erreichtePunkte);
    this.studLoesungForm.get('erreichtePunkte').setValidators([Validators.min(0), Validators.max(this.aufgabe.maxPunkte)]);

    this.spinner_aufgabe = false;
    this.start_aufgabe_impres = 2;
  }

  TEST2() {
    this.spinner_unittest = false;
    this.unitantwort = true;
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


  aufgabeHolen(id: number) {
    this.spinner_aufgabe = true;
    this.start_aufgabe_impres = 2;

    this.aufgabeAnzeugeReset();

    this.getAufgabe(id);
  }

  getAufgabe(id: number) {
    if (this.aufgabe !== null) {
      this.aufgabe.loesungStud = this.studLoesungForm.get('loesungstext').value;
      this.aufgabe.sGrad = this.studLoesungForm.get('schwierigkeit').value;
      this.aufgabe.erreichtePunkte = this.studLoesungForm.get('erreichtePunkte').value;
      this.studLoesungForm.reset();
    }

    if (this.jopApiDbService.istAufgebe(id)) {
      this.anzeigeStudLoesungenVorbereiten(id);
    } else {
      this.jopApiDbService.getAufgabePOST(id)
        .then(res => {
          console.log('########## getAufgabe(' + id + ') => Alles ist gut!');
          this.anzeigeStudLoesungenVorbereiten(id);
        })
        .catch(msg => {
          console.log('########## getAufgabe(' + id + ') => Fehler!!! ');
          console.log('########## msg:\n' + msg);
        });
    }
  }

  anzeigeStudLoesungenVorbereiten(id: number) {
    this.aufgabe = this.jopApiDbService.getAufgabe(id);

    this.studLoesungForm.get('loesungstext').setValue(this.aufgabe.loesungStud);
    this.studLoesungForm.get('schwierigkeit').setValue(this.aufgabe.sGrad + '');
    this.studLoesungForm.get('erreichtePunkte').setValue(this.aufgabe.erreichtePunkte);
    this.studLoesungForm.get('erreichtePunkte').setValidators([Validators.min(0), Validators.max(this.aufgabe.maxPunkte)]);

    this.spinner_aufgabe = false;
  }

  aufgabeAnzeugeReset() {
    this.kommentar = false;
    this.spinner_commenter = false;
    this.commentForm.reset();

    this.unitantwort = false;
    this.spinner_unittest = false;

    this.musterloeusung = false;
  }


  onClickComment() {
    this.kommentar = true;
  }

  onClickCommentSenden() {
    this.commentSenden(this.commentForm.get('comment').value, this.commentForm.get('email').value);
  }

  commentSenden(comment: string, email: string) {
    this.spinner_commenter = true;
    this.jopApiDbService.commentSenden(this.aufgabe.id, email, comment)
      .then(res => {
        console.log('########## Abgeschlossen: OK');
        this.onClickCommentClose();
      })
      .catch(msg => {
        console.log('########## Abgeschlossen: nicht OK');
        this.spinner_commenter = false;
      })
    ;
  }

  onClickCommentClose() {
    this.kommentar = false;
    this.spinner_commenter = false;
    this.commentForm.reset();
  }


  onClickLoesungSpeichern() {
    this.loesungSpeichern();
  }

  loesungSpeichern() {
    return new Promise((resolve, reject) => {
      this.jopApiDbService.loesungSpeichernPOST(
        this.aufgabe.id.toString(),
        this.studLoesungForm.get('loesungstext').value,
        (this.studLoesungForm.get('schwierigkeit').value + '' === this.aufgabe.sGrad + '')
          ? null : this.studLoesungForm.get('schwierigkeit').value,
        (this.studLoesungForm.get('erreichtePunkte').value + '' === this.aufgabe.erreichtePunkte + '')
          ? null : this.studLoesungForm.get('erreichtePunkte').value)
        .then(res => {
          console.log('########## 2. onClickLoesungSpeichern() ==> alles OK!');
        })
        .catch(msg => {
          console.log('########## 2. onClickLoesungSpeichern() ==> nicht OK!');
        });
    });
  }

  TEST3() {
    console.log(this.studLoesungForm.get('erreichtePunkte').value);
    console.log(this.aufgabe.erreichtePunkte);
    console.log(((this.studLoesungForm.get('erreichtePunkte').value + '' === this.aufgabe.erreichtePunkte + '')
      ? 'gleich' : 'nicht gleich'));
  }


  onClickUnit() {
    this.spinner_unittest = true;
    this.unitantwort = true;
    this.postUnittest();
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
          this.unitantwort = false;
          this.spinner_unittest = false;
        });
    });
  }


  onClickmusterl() {
    this.musterloeusung = true;
  }

  getErrorMessage() {
    /*return this.email.hasError('required') ? 'Bitte E-Mail eingeben' :*/
    return this.commentForm.get('email').hasError('email') ? 'Keine gültige E-Mail' :
      '';
  }

  getErrorMessagePunkte() {
    return this.studLoesungForm.get('erreichtePunkte').hasError('min') ? 'Minimum 0 ' :
      this.studLoesungForm.get('erreichtePunkte').hasError('max') ? `Maximum ${this.aufgabe.maxPunkte}` : '';
  }


  onClickImp() {
    this.start_aufgabe_impres = 3;
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
