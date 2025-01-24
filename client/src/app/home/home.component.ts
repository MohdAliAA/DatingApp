import { Component, inject, OnInit } from '@angular/core';
import { RegisterComponent } from "../register/register.component";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RegisterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
    http = inject (HttpClient);
    registerMode = false;
    user: any;

  
  ngOnInit(): void {
    this.getUsers();
  }

  
  getUsers()
  {
    this.http.get('https://localhost:5042/api/User').subscribe({
      next: response => this.user = response,
      error: error => console.log(error),
      complete: () =>  console.log('Request is complete'),

    })
  }


  registerToggle()
  {
    this.registerMode = !this.registerMode
  }
  
  cancelRegisterMode(event: boolean)
  {
    this.registerMode  = event;
  }

}
