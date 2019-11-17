import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {pluck, tap} from 'rxjs/operators';
import {URLS} from './URLS';

export interface IUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  position: string;
  position_id: number;
  registration_timestamp: number;
  photo: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public getUserList(page: number = 1, count: number = 6) {
    return this.http.get(URLS.users + `?page=${page}&count=${count}`).pipe(pluck('users'), tap(console.log));
  }

  public getUserById(id: number = 1) {
    return this.http.get(URLS.users + `/${id}`).pipe(pluck('user'), tap(console.log));
  }

  // TODO: create new service. Clarify naming
  public getPositions() {
    return this.http.get(URLS.positions).pipe(pluck('positions'), tap(console.log));
  }

  public createUser(form) {
    form.photo = form.photo.files[0];
    form.phone = '+38' + form.phone;
    const formData = new FormData();
    for (const field in form) {
      if (form.hasOwnProperty(field)) {
        formData.append(field, form[field]);
      }
    }
    return this.http.post(URLS.users, formData);
  }
}
