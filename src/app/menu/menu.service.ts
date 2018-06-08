import {Injectable, OnInit} from '@angular/core';

export class HeaderArray {
  thema: string;
  aufgabenId: number[];

  constructor(thema: string, aufgabenID: number[]) {
    this.thema = thema;
    this.aufgabenId = aufgabenID;
  }
}

export class UrdatenType {
  Sachliches_Themengebiet: string;
  id: number;
}

@Injectable()
export class MenuService implements OnInit {
  // urdaten: Array<UrdatenType>;
  dataJava1: Array<HeaderArray>;
  dataJava2: Array<HeaderArray>;

  constructor() {
    this.dataJava1 = [];
    this.dataJava2 = [];
    /*this.urdaten = [
      {'thema': 'Thema 1', 'aufgabenId': 101},
      {'thema': 'Thema 1', 'aufgabenId': 102},
      {'thema': 'Thema 1', 'aufgabenId': 103},
      {'thema': 'Thema 2', 'aufgabenId': 201},
      {'thema': 'Thema 2', 'aufgabenId': 202},
      {'thema': 'Thema 3', 'aufgabenId': 301},
      {'thema': 'Thema 3', 'aufgabenId': 302},
      {'thema': 'Thema 3', 'aufgabenId': 303},
      {'thema': 'Thema 3', 'aufgabenId': 304}
    ];
    this.buildArray_TestDaten();*/
  }

  ngOnInit() {

  }

  /*getData(): Array<HeaderArray> {
    this.dataJava1.forEach((data, index) => {
      console.log(data.thema);
      data.aufgabenId.forEach((id) => {
        console.log('  => ' + id);
      });
    });
    return this.dataJava1;
  }*/

  buildArrayJava1(urdaten: Array<UrdatenType>) {
    return new Promise((resolve, reject) => {
      let thema = '';
      let arr: number[] = [];
      this.dataJava1 = [];
      urdaten.forEach((data, index) => {
        if (index === 0) {
          thema = data.Sachliches_Themengebiet;
        }
        if (data.Sachliches_Themengebiet === thema) {
          arr.push(data.id);
        }
        if (index !== 0 && data.Sachliches_Themengebiet !== thema || index === urdaten.length - 1) {
          this.dataJava1.push(new HeaderArray(thema, arr));
          thema = data.Sachliches_Themengebiet;
          arr = [];
          arr.push(data.id);
        }
      });
      resolve();
    });
  }

  buildArrayJava2(urdaten: Array<UrdatenType>) {
    return new Promise((resolve, reject) => {
      let thema = '';
      let arr: number[] = [];
      this.dataJava2 = [];
      urdaten.forEach((data, index) => {
        if (index === 0) {
          thema = data.Sachliches_Themengebiet;
        }
        if (data.Sachliches_Themengebiet === thema) {
          arr.push(data.id);
        }
        if (index !== 0 && data.Sachliches_Themengebiet !== thema || index === urdaten.length - 1) {
          this.dataJava2.push(new HeaderArray(thema, arr));
          thema = data.Sachliches_Themengebiet;
          arr = [];
          arr.push(data.id);
        }
      });
      resolve();
    });
  }

  /*
    buildArray_TestDaten() {
      let thema = '';
      let arr: number[] = [];
      this.urdaten.forEach((data, index) => {
        if (index === 0) {
          thema = data.thema;
        }
        if (data.thema === thema) {
          arr.push(data.aufgabenId);
        }
        if (index !== 0 && data.thema !== thema || index === this.urdaten.length - 1) {
          this.dataJava1.push(new HeaderArray(thema, arr));
          thema = data.thema;
          arr = [];
          arr.push(data.aufgabenId);
        }
      });
    }
    */
}
