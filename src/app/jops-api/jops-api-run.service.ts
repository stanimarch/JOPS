import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

interface IRunResponse {
  status: number;
  output: string;
  errors: string;
  errorcode: string;
}

@Injectable()
export class JopsApiRunService {
  apiRootUrl = 'http://jops.informatik.hs-augsburg.de/api/run'; // um erwas      lokal zu testen
  url = './api/run';                                            // um erwas auf Server zu testen
  data: IRunResponse;

  constructor(private http: HttpClient) {
  }

  doPostRun_local(): void {
    console.log('1. Service: JopsApiRunService => Mehtode: doPostRun(), apiRootUrl:' + this.apiRootUrl);
    this.http.post(this.apiRootUrl, {
      matrnr: '560056',
      aufgabenid: '102',
      code: 'bla-bla-bla'
    }).subscribe(res => {
      console.log('2. Res = ' + res.valueOf());
    });
  }

  doPostRun_glaobal(): void {
    console.log('Service: JopsApiRunService => Mehtode: doPostRun(), url:' + this.url);
    this.http.post(this.url, {
      matrnr: '560056',
      aufgabenid: '102',
      code: 'bla-bla-bla'
    }).subscribe(res => {
      console.log(res.valueOf());
    });
  }


  // fur echte Web-App
  doPostRun(matrnr: string, aufgabenid: string, code: string): void {
    console.log('Service: JopsApiRunService => Mehtode: doPostRun(), url:' + this.url);
    this.http.post(this.url, {
      matrnr: `${matrnr}`,
      aufgabenid: `${aufgabenid}`,
      code: `${code}`
    }).subscribe((res: IRunResponse) => {
      console.log(res.valueOf());
      this.data = res;
    });
  }
}
