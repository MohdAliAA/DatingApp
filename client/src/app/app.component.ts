import { NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgFor],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{

  http = inject (HttpClient);
  title = 'DatingApp';
  user: any;

  ngOnInit(): void {

    this.http.get('https://localhost:5042/api/User').subscribe({
      next: response => this.user = response,
      error: error => console.log(error),
      complete: () =>  console.log('Request is complete'),

    })


  }

}
