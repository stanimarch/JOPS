import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>,
            next: HttpHandler): Observable<HttpEvent<any>> {

    const sessionId = localStorage.getItem('sessionId');

    if (sessionId) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization',
          'Bearer ' + sessionId)
      });

      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}

