import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class JopApiDbService {

  apiRootUrl = 'http://jops.informatik.hs-augsburg.de/api/login'; // um erwas      lokal zu testen
  url = './api/login';                                            // um erwas auf Server zu testen

  constructor(private http: HttpClient) {
  }


}
