import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {MenuService, UrdatenType} from '../menu/menu.service';

export class SThemaResponse {
  status: number;
  error: string;
  response: Array<UrdatenType>;
}

export class MusterLoesung {
  text: string;
  bild: string;

  constructor(text: string, bild: string) {
    this.text = text;
    this.bild = bild;
  }
}

export class Aufgabe {
  id: number;
  sThemengebiet: string;
  iThemengebiet: string;
  titel: string;
  maxPunkte: number;
  aufgabenText: string;
  unittest: string;
  unittestAusgabe: string;
  loesungStud: string;
  sGrad: number;
  erreichtePunkte: number;
  musterLoesungen: Array<MusterLoesung>;

  constructor(id: number,
              sThemengebiet: string,
              iThemengebiet: string,
              titel: string,
              maxPunkte: number,
              aufgabenText: string,
              unittest: string,
              unittestAusgabe: string,
              loesungStud: string,
              sGrad: number,
              erreichtePunkte: number,
              musterLoesungen: Array<MusterLoesung>) {
    this.id = id;
    this.sThemengebiet = sThemengebiet;
    this.iThemengebiet = iThemengebiet;
    this.titel = titel;
    this.maxPunkte = maxPunkte;
    this.aufgabenText = aufgabenText;
    this.unittest = unittest;
    this.unittestAusgabe = unittestAusgabe;
    this.loesungStud = loesungStud;
    this.sGrad = sGrad;
    this.erreichtePunkte = erreichtePunkte;
    this.musterLoesungen = musterLoesungen;
  }
}

export class UrdatenAufgabe {
  Titel: string;
  Sachliches_Themengebiet: string;
  Inhaltliches_Themengebiet: string;
  Aufgabentext: string;
  Gesamtpunkte: number;
  Datei: string;
  Unittest: string;
  LoesungsNr: number;
  Loesungsbild: string;
  Loesungstext: string;
}

export class Studloesung {
  Erreichte_Punkte: number;
  Loesung: string;
}

export class SAufgabeResponse {
  status: number;
  error: string;
  aufgabe: Array<UrdatenAufgabe>;
  studloesung: Array<Studloesung>;
}

export class CommentResponse {
  status: number;
  error: string;
  response: number;
}

export class SaveResponse {
  status: number;
  error: string;
  response: number;
}

export class UnittestResponse {
  status: number;
  output: string;
  errors: Array<any>;
}

@Injectable()
export class JopApiDbService implements OnInit {
  aufgabenArray: Array<Aufgabe>;
  musterLoesungen: Array<MusterLoesung>;
  unittestResponse: UnittestResponse;

  constructor(private http: HttpClient,
              private menuService: MenuService) {
    this.aufgabenArray = [];
  }

  ngOnInit() {
  }

  loesungSpeichernPOST(id: string, text: string, sgrad: string, punkte: string) {
    return new Promise((resolve2, reject2) => {
      console.log('&&&&& 1. loesungSpeichernPOST ==> START');
      this.http.post<SaveResponse>('./api/save', new HttpParams()
          .set(`matrNr`, localStorage.getItem('matrNr'))
          .set(`aufgabenId`, id)
          .set(`text`, text)
          .set(`sgrad`, sgrad)
          .set(`punkte`, punkte),
        {
          headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        }).toPromise()
        .then(res => {
          console.log('&&&&& 2. this.http.post: ==> POST OK');
          console.log('&&&&& 3. JSON.stringify(res.valueOf()): ==>' + JSON.stringify(res.valueOf()));
          resolve2();
        })
        .catch((msg) => {
          console.log('&&&&& 2. this.http.post: ==> POST nicht OK');
          reject2();
        });
    });
  }


  postUnittest(id: string, loesungStud: string, titel: string, unittest: string) {
    console.log('##### 1. postUnittest(code: string, id: string)');
    return new Promise((resolve, reject) => {
      this.http.post<UnittestResponse>('./api/run', new HttpParams()
          .set(`matrNr`, localStorage.getItem('matrNr'))
          .set(`aufgabenId`, id)
          .set(`code`, loesungStud)
          .set(`titel`, titel)
          .set(`unittest`, unittest),
        {
          headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        }).toPromise()
        .then(res => {
          console.log('##### 2. this.http.post: ==> alles OK');
          console.log('##### 3. JSON.stringify(res.valueOf()): ==> ' + JSON.stringify(res.valueOf()));
          this.unittestResponse = new UnittestResponse();
          this.unittestResponse.status = res.status;
          this.unittestResponse.errors = res.errors;
          this.unittestResponse.output = res.output;
          resolve();
        })
        .catch(msg => {
          console.log('##### 2. this.http.post: ==> alles nicht OK');
          reject();
        });
    });
  }

  commentSenden(id: number, comment: string, email: string) {
    return new Promise((resolve, reject) => {
      this.http.post<CommentResponse>('./api/comment', new HttpParams()
          .set(`aufgabenId`, id.toString())
          .set(`email`, email)
          .set(`comment`, comment),
        {
          headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        }).toPromise()
        .then(res => {
          console.log(res.valueOf());
          // console.log('Alles ist gut gelaufen: ' + 'this.http.post...CommentResponse...(\'./api/comment\'');
          resolve();
        })
        .catch(msg => {
          console.log(msg.valueOf());
          // console.log('Alles ist nicht gut gelaufen: ' + 'this.http.post...CommentResponse...(\'./api/comment\'');
          reject();
        });
    });
  }


  istAufgebe(id: number): boolean {
    for (let i = 0, len = this.aufgabenArray.length; i < len; i++) {
      if (this.aufgabenArray[i].id === id) {
        return true;
      }
    }
    console.log('istAufgebe(id: number): ' + 'false');
    return false;
  }

  getAufgabe(id: number): Aufgabe {
    console.log('@@@@@ jops-api-db.service:    getAufgabe(id: number)');
    for (let i = 0, len = this.aufgabenArray.length; i < len; i++) {
      if (this.aufgabenArray[i].id === id) {
        console.log('######### JSON.stringify(aufgabe.valueOf()) ==> ' + JSON.stringify(this.aufgabenArray[i].valueOf()));
        return this.aufgabenArray[i];
      }
    }
    return null;
  }

  getAufgabePOST(id: number) {
    return new Promise((resolve2, reject2) => {
      this.http.post<SAufgabeResponse>('./api/aufgabe', new HttpParams()
          .set(`aufgabenId`, id.toString())
          .set(`matrNr`, localStorage.getItem('matrNr')),
        {
          headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        }).toPromise()
        .then(res => {

          if (res.status === 200) {
            console.log('########## 001. getAufgabePOST(id: number) ');
            console.log('########## 002. JSON.stringify(res.valueOf()) ' + JSON.stringify(res.valueOf()));
            this.musterLoesungen = [];


            res.aufgabe.forEach((data, index) => {
              console.log('######### 4. index');
              console.log('######### 5. res.aufgabe.forEach((data, index) => {...};');
              console.log('######### 6. JSON.stringify(data.valueOf()):   => ' + data.valueOf().toString());
              console.log('6.1 data.Sachliches_Themengebiet' + data.Sachliches_Themengebiet);
              console.log('6.2 data.Loesungsbild: ' + data.Loesungsbild);
              console.log('6.3 data.Loesungstext: ' + data.Loesungstext);

              this.musterLoesungen.push(new MusterLoesung(
                data.Loesungstext,
                data.Loesungsbild));
              console.log('######### 7. this.musterLoesungen.push(new MusterLoesung(data.LoesungsText,data.LoesungsBild));\n' +
                'JSON.stringify(this.musterLoesungen.valueOf()) ===>  '
                + JSON.stringify(this.musterLoesungen.valueOf()));


              if (index === res.aufgabe.length - 1) {
                console.log('########## 8. JSON.stringify(musterLoesungen.valueOf())' + JSON.stringify(this.musterLoesungen.valueOf()));
                this.aufgabenArray.push(new Aufgabe(
                  id,
                  data.Sachliches_Themengebiet,
                  data.Inhaltliches_Themengebiet,
                  data.Titel,
                  data.Gesamtpunkte,
                  data.Aufgabentext,
                  data.Unittest,
                  null,
                  res.studloesung[0].Loesung,
                  null,
                  res.studloesung[0].Erreichte_Punkte,
                  this.musterLoesungen
                ));
                console.log('########## 9. this.aufgabenArray.push(new Aufgabe...);\n' +
                  '########### 10. JSON.stringify(this.aufgabenArray[0].valueOf()) ==> ' + JSON.stringify(this.aufgabenArray[0].valueOf()));
              }
            });

            resolve2();
          } else {
            console.log('getAufgabePOST(id: number): Schlecht: ' + JSON.stringify(res.valueOf()));
            reject2();
          }
        })
        .catch(msg => {
          console.log('getAufgabePOST(id: number): Schlecht: ' + msg);
          reject2();
        });
    });
  }


  buildJava1() {
    return new Promise((resolve, reject) => {
      this.http.get<SThemaResponse>('./api/1')
        .toPromise()
        .then((res) => {
          this.menuService.buildArrayJava1(res.response)
            .then(res2 => {
              resolve();
            })
            .catch(msg => {
              reject();
            });
        }).catch(msg => {
        console.log('########## Error by http.get(): ' + msg);
        reject();
      });
    });
  }

  buildJava2() {
    return new Promise((resolve, reject) => {
      this.http.get<SThemaResponse>('./api/2')
        .toPromise()
        .then((res) => {
          this.menuService.buildArrayJava2(res.response)
            .then(res2 => {
              resolve();
            })
            .catch(msg => {
              reject();
            });
        }).catch(msg => {
        console.log('########## Error by http.get(): ' + msg);
        reject();
      });
    });
  }
}
