import { Component, inject } from '@angular/core';
import { AccountService } from '../../_services/account.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-test-errors',
  standalone: true,
  imports: [],
  templateUrl: './test-errors.component.html',
  styleUrl: './test-errors.component.css'
})
export class TestErrorsComponent {
  accountService = inject(AccountService);
  http = inject(HttpClient);
  baseUrl = environment.apiUrl;


  getError400()
  {
    this.http.get(this.baseUrl + 'Buggy/bad-request').subscribe({
      next: reponse => console.log(reponse),
      error: err => console.log(err)
    })
  }
  getError401()
  {
    this.http.get(this.baseUrl + 'Buggy/auth').subscribe({
      next: reponse => console.log(reponse),
      error: error => console.log(error)
    })
  }
  getError404()
  {
    this.http.get(this.baseUrl + 'Buggy/not-found').subscribe({
      next: reponse => console.log(reponse),
      error: error => console.log(error)
    })
  }
  getError500()
  {
    this.http.get(this.baseUrl + 'Buggy/server-error').subscribe({
      next: reponse => console.log(reponse),
      error: error => console.log(error)
    })
  } 
  getValidationError400()
  {
    this.http.post(this.baseUrl + 'account/register', {}).subscribe({
      next: reponse => console.log(reponse),
      error: error => console.log(error)
    })
  } 
}
