import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {FormGroup} from '@angular/forms';
import {CustomEncoder} from './jop-api-db.service';

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
  dataLogin: DataLogin;

  constructor(private http: HttpClient) {
  }


  login(myForm: FormGroup) {
    return new Promise((resolve, reject2) => {
      localStorage.removeItem('sessionId');
      localStorage.removeItem('matrNr');
      this.postPromise(myForm)
        .then(value => {
          resolve();
        })
        .catch(reason => {
          reject2();
        });
    });
  }

  postPromise(myForm: FormGroup) {
    return new Promise((resolve, reject4) => {
      const params = new HttpParams({encoder: new CustomEncoder()});
      this.http.post<ILogin>(this.url, params
          .set(`username`, myForm.get('username').value)
          .set(`password`, myForm.get('password').value),
        {
          headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        }).toPromise()
        .then(res => {
          this.dataLogin = new DataLogin(res.status, res.error, res.matrNr, res.sessionId);
          if (this.setSession()) {
            resolve();
          } else {
            reject4();
          }
        }).catch(msg => {
          // console.log('error =>');
          // console.log(JSON.stringify(msg.valueOf()));
          reject4();
        }
      );
    });
  }


  private setSession(): boolean {
    if (this.dataLogin === null || this.dataLogin === undefined) {
      return false;
    } else {
      if (this.dataLogin.status === 200 && this.dataLogin.sessionId !== null && this.dataLogin.sessionId !== undefined) {
        // console.log('this.dataLogin.status === 200 && this.dataLogin.sessionId !== null && this.dataLogin.sessionId !== undefined');
        localStorage.setItem('sessionId', this.dataLogin.sessionId);
        localStorage.setItem('matrNr', this.dataLogin.matrNr);
        this.dataLogin = null;
        return true;
      } else {
        // console.log('this.dataLogin.status !== 200 or this.dataLogin.sessionId === null or this.dataLogin.sessionId === undefined');
        // console.log('JSON.stringify(this.dataLogin.valueOf()) = ' + JSON.stringify(this.dataLogin.valueOf()));
        this.dataLogin = null;
        return false;
      }
    }
  }

  logout() {
    localStorage.removeItem('sessionId');
    localStorage.removeItem('matrNr');
  }
}
