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
  dataJava1: Array<HeaderArray>;
  dataJava2: Array<HeaderArray>;

  constructor() {
    this.dataJava1 = [];
    this.dataJava2 = [];
  }

  ngOnInit() {

  }

  buildArrayJava1(urdaten: Array<UrdatenType>) {
    return new Promise((resolve, reject) => {
      let thema = '';
      let arr: number[] = [];
      this.dataJava1 = [];
      urdaten.forEach((data, index) => {
        // console.log('Index: ' + index + '; Satz: ' + JSON.stringify(data.valueOf()));
        if (index === 0) {
          thema = data.Sachliches_Themengebiet;
        }
        if (data.Sachliches_Themengebiet === thema) {
          arr.push(data.id);
        }
        if (data.Sachliches_Themengebiet !== thema) {
          this.dataJava1.push(new HeaderArray(thema, arr));
          thema = data.Sachliches_Themengebiet;
          arr = [];
          arr.push(data.id);
        }
        if (index === urdaten.length - 1) {
          this.dataJava1.push(new HeaderArray(thema, arr));
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
        // console.log('Index: ' + index + '; Satz: ' + JSON.stringify(data.valueOf()));
        if (index === 0) {
          thema = data.Sachliches_Themengebiet;
        }
        if (data.Sachliches_Themengebiet === thema) {
          arr.push(data.id);
        }
        if (data.Sachliches_Themengebiet !== thema) {
          this.dataJava2.push(new HeaderArray(thema, arr));
          thema = data.Sachliches_Themengebiet;
          arr = [];
          arr.push(data.id);
        }
        if (index === urdaten.length - 1) {
          this.dataJava2.push(new HeaderArray(thema, arr));
        }
      });
      resolve();
    });
  }
}
