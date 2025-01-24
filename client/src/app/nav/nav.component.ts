import { Component, inject } from '@angular/core';
import {FormsModule} from '@angular/forms'
import { AccountService } from '../_services/account.service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { Router, RouterLink, RouterLinkActive, ROUTES } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule,BsDropdownModule,RouterLink, RouterLinkActive, TitleCasePipe],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

accountservice = inject(AccountService);
private router = inject(Router)
private toastr = inject(ToastrService)
//loggedin = false;
model : any ={};

login()
{
  this.accountservice.login(this.model).subscribe(
    {
      // next: response =>{
      //   console.log(response);
        //this.loggedin=true;
      //},
       next: () => {
        this.router.navigateByUrl('/members');
       },
       //error: error => console.log(error)
       error: error => this.toastr.error(error.error)

        
       
    });

  }
  //console.log(this.model);
   //this.model;

   Logout()
   {
    this.accountservice.Logout();
    this.router.navigateByUrl('/');
   }
}

