import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

export class Zeile {
  themengebiet: string;
  aufgabeIndex: string;

  constructor(themengebiet: string, aufgabeIndex: string) {
    this.themengebiet = themengebiet;
    this.aufgabeIndex = aufgabeIndex;
  }
}

@Injectable()
export class JopApiDbService {
  apiRootUrl = 'http://jops.informatik.hs-augsburg.de/api/login'; // um erwas      lokal zu testen
  url = './api/login';                                            // um erwas auf Server zu testen
  menuList: Array<Zeile> = [];

  constructor(private http: HttpClient) {
    this.menuList = [
      new Zeile('Klassen', '100'),
      new Zeile('Klassen', '101'),
      new Zeile('Klassen', '102'),
      new Zeile('Klassen', '103'),
      new Zeile('Klassen', '104'),
      new Zeile('Exception', '200'),
      new Zeile('Exception', '201'),
      new Zeile('Exception', '202'),
      new Zeile('Thread', '300'),
      new Zeile('Thread', '301'),
      new Zeile('Thread', '302'),
      new Zeile('Thread', '303'),
      new Zeile('Thread', '304'),
      new Zeile('Thread', '305')
    ];
    this.menuList.push(new Zeile('Thread', '306'));
  }


}
