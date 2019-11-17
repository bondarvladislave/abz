import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {URLS} from './URLS';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  private url = 'https://frontend-test-assignment-api.abz.agency';

  constructor(private http: HttpClient) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    const clone: any = req.clone({
      url: this.url + req.url,
    });
    if (token) {
      clone.headers = req.headers.set(
        'Token',
        token
      );
    }
    return next.handle(clone);
  }
}
