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
  }

  ngOnInit() {
    this.aufgabenArray = [];
  }

  /* this.aufgabe.id.toString(), this.aufgabe.loesungStud, this.aufgabe.titel, this.aufgabe.unittest */
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

  commentSenden(comment: string, id: number) {
    return new Promise((resolve, reject) => {
      this.http.post<CommentResponse>('./api/comment', new HttpParams()
          .set(`aufgabenId`, id.toString())
          .set(`comment`, comment),
        {
          headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        }).toPromise()
        .then(res => {
          console.log(res.valueOf());
          console.log('Alles ist gut gelaufen: ' + 'this.http.post...CommentResponse...(\'./api/comment\'');
          resolve();
        })
        .catch(msg => {
          console.log(msg.valueOf());
          console.log('Alles ist nicht gut gelaufen: ' + 'this.http.post...CommentResponse...(\'./api/comment\'');
          reject();
        });
    });
  }


  istAufgebe(id: number) {
    this.aufgabenArray.forEach(aufgabe => {
      if (aufgabe.id === id) {
        return true;
      }
    });
    console.log('istAufgebe(id: number): ' + 'false');
    return false;
  }

  getAufgabe(id: number) {
    this.aufgabenArray.forEach(aufgabe => {
      if (aufgabe.id === id) {
        return aufgabe;
      }
    });
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
            // this.aufgabenArray.push(res.response);
            console.log('########## 001. JSON.stringify(res.valueOf()) ' + JSON.stringify(res.valueOf()));

            this.musterLoesungen = [];
            /*
            res.response.forEach((data, index) => {
              console.log('######### 5.res.response.forEach((data, index) => {...};');
              console.log('######### 6. data: ' + JSON.stringify(data.valueOf()));
              console.log('6.1 data.Sachliches_Themengebiet' + data.Sachliches_Themengebiet);
              console.log('6.2 data.LoesungsBild' + data.LoesungsBild);
              console.log('6.3 data.LoesungsText' + data.LoesungsText);
              console.log('6.4 data.id' + data.id);

              this.musterLoesungen.push(new MusterLoesung(
                data.LoesungsText,
                data.LoesungsBild));
              console.log('######### 8. this.musterLoesungen.push(new MusterLoesung(data.LoesungsText,data.LoesungsBild));\n' +
                'JSON.stringify(this.musterLoesungen.valueOf()) ===>  '
                + JSON.stringify(this.musterLoesungen.valueOf()));


              if (index === res.response.length - 1) {
                console.log('########## 9. JSON.stringify(musterLoesungen.valueOf())' + JSON.stringify(this.musterLoesungen.valueOf()));
                this.aufgabenArray.push(new Aufgabe(
                  data.id,
                  data.Sachliches_Themengebiet,
                  null,
                  null,
                  null,
                  null,
                  null,
                  null,
                  null,
                  null,
                  null,
                  this.musterLoesungen
                ));
                console.log('########## this.aufgabenArray.push(new Aufgabe...);\n' +
                  '########### 10. JSON.stringify(this.aufgabenArray.values()) ==> ' + JSON.stringify(this.aufgabenArray.values()));
              }
            });*/

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
