import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormGroup} from '@angular/forms';


interface ILoginResponse {
  status: number;
  error: string;
  response: string;
}

@Injectable()
export class JopsApiLoginService {

  apiRootUrl = 'http://jops.informatik.hs-augsburg.de/api/login'; // um erwas      lokal zu testen
  url = './api/login';                                            // um erwas auf Server zu testen
  data: ILoginResponse;

  constructor(private http: HttpClient) {
  }

  doPostLogin_local(): void {
    console.log('1. Service: JopsApiLoginService => Mehtode: doPostLogin_local(), apiRootUrl:' + this.apiRootUrl);
    this.http.post(this.apiRootUrl, {
      unsername: 'Muster',
      password: '123456789'
    }).subscribe(res => {
      console.log('2. Res = ' + res.valueOf());
    });
  }

  doPostLogin_global(myForm: FormGroup): void {
    console.log('1. Service: JopsApiLoginService => Mehtode: doPostLogin_global(), url:' + this.url);
    this.http.post(this.url, JSON.stringify(myForm))
      .subscribe(res => {
        console.log('2. Res = ' + res.valueOf());
      });
  }

  // fur echte Web-App
  doPostLogin(username: string, password: string): void {
    console.log('Service: JopsApiLoginService => Mehtode: doPostLogin(), url:' + this.url);
    this.http.post(this.url, {
      username: `${username}`,
      password: `${password}`
    }).toString();
  }
}
