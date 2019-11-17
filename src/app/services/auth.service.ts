import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {URLS} from './URLS';
import {shareReplay, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  public getToken() {
    return this.http.get(URLS.token).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.token);
      }),
      shareReplay(1));
  }
}
