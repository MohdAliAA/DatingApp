import { Component, EventEmitter, inject, input, output } from '@angular/core';
import {FormsModule} from '@angular/forms'
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private accountservice = inject(AccountService);
  private toastr = inject(ToastrService);
// usersFromHomeComponent = input.required<any>();
//@Output() cancelRegister = new EventEmitter();  
cancelRegister = output<boolean>(); //new approch for emit function  

model : any = {}

register(){
  this.accountservice.Register(this.model).subscribe({
    next: response => {
      console.log(response);
      this.cancel();
    },
    //error: error => console.log(error)
    error: error => this.toastr.error(error.error)

  })
}

cancel(){
this.cancelRegister.emit(false);

}

}
