import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MenuService, UrdatenType} from '../menu/menu.service';


export class SThemaResponse {
  status: number;
  error: string;
  response: Array<UrdatenType>;
}

@Injectable()
export class JopApiDbService {

  constructor(private http: HttpClient,
              private menuService: MenuService) {
  }

  buildJava1() {
    console.log('########## JopApiDbService => buildJava1(): ');
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
    console.log('########## JopApiDbService => buildJava2(): ');
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
