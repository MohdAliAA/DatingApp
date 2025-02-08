import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { Member } from '../_models/Member';
import { AccountService } from './account.service';
import { of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  private http = inject(HttpClient);
  //private accountService = inject(AccountService);
  baseUrl = environment.apiUrl;
  member = signal<Member[]>([]);
  
  getMembers(){

    return this.http.get<Member[]>(this.baseUrl + 'user').subscribe({
      next: member => this.member.set(member)
    });
  }

  getMember(username : string){
    const member = this.member().find(x=>x.username === username);
    if(member !== undefined){
      return of(member);
    }
    return this.http.get<Member>(this.baseUrl + 'user/' + username );
  }

  updateMember(member: Member){
    return this.http.put(this.baseUrl + 'user' , member).pipe(
      tap(()=>{
        this.member.update(memmbers => memmbers.map(m => m.username === member.username ? member: m))
      })
    );
  }
  // getHttpOptions()
  // {
  //   return{
  //     headers: new HttpHeaders({
  //       Authorization:`Bearer ${this.accountService.currentUser()?.token}`
  //     })
  //   }
  // }

}
