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

  doPostRun(): void {
    const url = `./api/run`;
    console.log('doPostLogin()' + url);
    this.http.post(url, {
      code: 'testCode',
      aufgabenid: '123456789',
      matnr: '560280'
    }).subscribe(res => {
      console.log(res.valueOf());
    });
  }
}
