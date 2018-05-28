import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class JopsApiService {

  constructor(private http: HttpClient) {
  }
}
