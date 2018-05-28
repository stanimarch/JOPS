import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

/*interface ILogin {
  status: number;
  error: string;
  response: string;
}
*/

@Injectable()
export class JopsApiLoginService {

  apiRootUrl = 'http://jops.informatik.hs-augsburg.de';

  constructor(private http: HttpClient) {
  }

  doPostLogin() {
    const url = `./api/login`;
    console.log('doPostLogin()' + url);
    this.http.post(url, {
      username: 'test',
      password: '123456789'
    }).subscribe(res => {
      console.log(res.valueOf());
    });
  }

  // Beispiel Get
  doGetGithub() {
    const url = `https://api.github.com/users`;
    console.log('doPostLogin()' + url);
    this.http.get(url)
      .subscribe(res => {
        console.log(res.toString());
      });
  }

  // Beispiel Post
  doPostTestServer() {
    const url = `http://httpbin.org/post`;
    console.log('doPostLogin()' + url);
    this.http.post(url, {
      codes: 'test'
    }).subscribe(res => {
      console.log(res.valueOf());
    });
  }
}
