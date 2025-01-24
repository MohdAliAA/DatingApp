import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { User } from '../_models/User';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private http = inject(HttpClient);
  baseUrl = 'https://localhost:5042/api/';
  currentUser = signal<User | null>(null);

  login(model:any){

    return this.http.post<User>(this.baseUrl + 'account/login', model).pipe(
      map(user => {
        if(user)
        {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUser.set(user);
        }
      })
    )
  } 

  Logout()
  {
    localStorage.removeItem('user');
    this.currentUser.set(null);
  }

  Register(model:any){

    return this.http.post<User>(this.baseUrl + 'account/Register', model, ).pipe(
      map(user => {
        if(user)
        {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUser.set(user);
        }
        return user;
      })
    );
  }
}
