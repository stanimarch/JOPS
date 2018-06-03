import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {FormGroup} from '@angular/forms';

interface ILogin {
  status: number;
  error: string;
  matrNr: string;
  sessionId: string;
}

export class DataLogin {
  status: number;
  error: string;
  matrNr: string;
  sessionId: string;

  constructor(status: number,
              error: string,
              matrNr: string,
              sessionId: string) {
    this.status = status;
    this.error = error;
    this.matrNr = matrNr;
    this.sessionId = sessionId;
  }
}

@Injectable()
export class JopsApiLoginService {
  url = './api/login';
  error: HttpErrorResponse;
  dataLogin: DataLogin;

  // testUrl = 'http://httpbin.org/post';  // um zu testen

  constructor(private http: HttpClient) {
  }

  async login(myForm: FormGroup) {
    localStorage.removeItem('sessionId');
    localStorage.removeItem('matrNr');
    await this.http.post<ILogin>(this.url, new HttpParams()
        .set(`username`, myForm.get('username').value)
        .set(`password`, myForm.get('password').value),
      {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      }).subscribe(res => {
      this.dataLogin = new DataLogin(res.status, res.error, res.matrNr, res.sessionId);
      console.log(JSON.stringify(res.valueOf()));
    }, error => {
      console.log(JSON.stringify(error.valueOf()));
      this.error = error;
    });
    await this.setSession();
  }

  private setSession(): void {
    if (this.dataLogin === null || this.dataLogin === undefined) {
      console.log('data === null');
      localStorage.setItem('sessionId', '1526845922565'); // für Test
    } else {
      if (this.dataLogin.status === 200) {
        console.log('this.dataLogin.status === 200');
        localStorage.setItem('sessionId', this.dataLogin.sessionId);
        // localStorage.setItem('sessionId', '1526845922565'); // für Test
        localStorage.setItem('matrNr', this.dataLogin.matrNr);
        this.dataLogin = null;
      } else {
        console.log('this.dataLogin.status !== 200; status = ' + this.dataLogin.status);
        console.log('JSON.stringify(this.dataLogin.valueOf()) = ' + JSON.stringify(this.dataLogin.valueOf()));
        // localStorage.setItem('sessionId', '1526845922565'); // für Test
        this.dataLogin = null;
      }
    }
  }

  logout() {
    localStorage.removeItem('sessionId');
    localStorage.removeItem('matrNr');
  }
}
