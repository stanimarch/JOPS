import {Injectable} from '@angular/core';

export class HeaderArray {
  thema: string;
  aufgabenId: number[];

  constructor(thema: string, aufgabenID: number[]) {
    this.thema = thema;
    this.aufgabenId = aufgabenID;
  }
}

export class UrdatenType {
  thema: string;
  aufgabenId: number;
}

@Injectable()
export class MenuService {
  urdaten: Array<UrdatenType>;
  dataHeader: Array<HeaderArray>;

  constructor() {
    this.urdaten = [
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
    this.dataHeader = [];
    this.buildArray();
  }

  getData(): Array<HeaderArray> {
    this.dataHeader.forEach((data, index) => {
      console.log(data.thema);
      data.aufgabenId.forEach((id) => {
        console.log('  => ' + id);
      });
    });
    return this.dataHeader;
  }


  buildArray() {
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
        this.dataHeader.push(new HeaderArray(thema, arr));
        thema = data.thema;
        arr = [];
        arr.push(data.aufgabenId);
      }
    });
  }

  buildArray2(urdatenType: Array<UrdatenType>) {
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
        this.dataHeader.push(new HeaderArray(thema, arr));
        thema = data.thema;
        arr = [];
        arr.push(data.aufgabenId);
      }
    });
  }
}
