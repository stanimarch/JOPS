import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MenuService, UrdatenType} from '../menu/menu.service';

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

  constructor(private http: HttpClient,
              private menuService: MenuService) {
  }

  java1() {
    console.log('########## JopApiDbService => java1():');
    return new Promise((resolve, reject) => {
      this.http.get('./api/java1')
        .toPromise()
        .then((res: Array<UrdatenType>) => {
          // this.menuService.buildArray2(res);
          res.forEach((data, index) => {
            console.log('Index: ' + index + 'data: ' + data.toString());
          });
          resolve();
        }).catch(msg => {
        console.log('Error: ' + msg);
        reject();
      });
    });
  }

}
