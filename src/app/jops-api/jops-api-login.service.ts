import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {FormGroup} from '@angular/forms';

interface ILogin {
  status: number;
  error: string;
  matrNr: string;
  sessionId: string;
}

@Injectable()
export class JopsApiLoginService {
  url = './api/login';
  error: HttpErrorResponse;

  // testUrl = 'http://httpbin.org/post';  // um zu testen

  constructor(private http: HttpClient) {
  }

  login(myForm: FormGroup): boolean {
    localStorage.removeItem('sessionId');
    localStorage.removeItem('matrNr');
    let data: ILogin;
    this.http.post<ILogin>(this.url, new HttpParams()
        .set(`username`, myForm.get('username').value)
        .set(`password`, myForm.get('password').value),
      {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      }).subscribe(res => {
      data = res;
    }, error => {
      this.error = error;
    });
    return this.setSession(data);
  }

  private setSession(data: ILogin): boolean {
    if (data === undefined) {
      return true;
    }
    if (data.status === 200) {
      localStorage.setItem('sessionId', data.sessionId);
      localStorage.setItem('matrNr', data.matrNr);
      return true;
    } else {
      return false;
    }
  }

  logout() {
    localStorage.removeItem('sessionId');
    localStorage.removeItem('matrNr');
  }
}
