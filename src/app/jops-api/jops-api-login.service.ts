import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {FormGroup} from '@angular/forms';


interface ILoginResponse {
  status: number;
  error: string;
  response: string;
}

@Injectable()
export class JopsApiLoginService {

  apiRootUrl = 'http://jops.informatik.hs-augsburg.de/api/login';
  url = './api/login';
  data: ILoginResponse;

  testUrl = 'http://httpbin.org/post';


  constructor(private http: HttpClient) {
  }


  doPostLogin_global(myForm: FormGroup): void {
    console.log('1. Service: JopsApiLoginService => JSON.stringify(myForm.toString()) ===>' + JSON.stringify(myForm.value));

    this.http.post(this.url, myForm.value, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    })
      .subscribe(res => {
        console.log('2. Res = ' + JSON.stringify(res.valueOf()));
      });
  }
}


/*
doPostLogin_local(): void {
    console.log('1. Service: JopsApiLoginService => Mehtode: doPostLogin_local(), apiRootUrl:' + this.apiRootUrl);
    this.http.post(this.apiRootUrl, {
      unsername: 'Muster',
      password: '123456789'
    }).subscribe(res => {
      console.log('2. Res = ' + res.valueOf());
    });
  }
*/

/*
doPostLogin_global(myForm: FormGroup): void {
  console.log('1. Service: JopsApiLoginService => Mehtode: doPostLogin_global(), JSON.stringify(myForm.value):' +
  JSON.stringify(myForm.value));

  this.http.post(this.testUrl, JSON.stringify(myForm.value))
    .subscribe(res => {
    console.log('2. Res = ' + res.valueOf());
  });

}
}
*/
