import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {FormGroup} from '@angular/forms';


interface ILoginResponse {
  status: number;
  error: string;
  response: string;
}

@Injectable()
export class JopsApiLoginService {
  url = './api/login';
  data: ILoginResponse;

  // testUrl = 'http://httpbin.org/post';  // um zu testen


  constructor(private http: HttpClient) {
  }


  doPostLogin_global(myForm: FormGroup): void {
    console.log('1. Service: JopsApiLoginService => JSON.stringify(myForm.toString()) ===>' + JSON.stringify(myForm.value));

    this.http.post(this.url, new HttpParams()
        .set(`username`, myForm.get('username').value)
        .set(`password`, myForm.get('password').value),
      {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      })
      .subscribe(res => {
        console.log('2. Res = ' + JSON.stringify(res.valueOf()));
      });
  }
}

/*
doPostLogin_global(myForm: FormGroup): void {
  console.log('1. Service: JopsApiLoginService => JSON.stringify(myForm.toString()) ===>' + JSON.stringify(myForm.value));

this.http.post(this.url, myForm.value,
  {
    headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
  })
  .subscribe(res => {
    console.log('2. Res = ' + JSON.stringify(res.valueOf()));
  });
}
}
*/
