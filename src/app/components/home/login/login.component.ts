import { Component } from '@angular/core';
import {  Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
//import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  isLoading: boolean = false;

  constructor(private router: Router) {}

  salvaDati(nome: string, cognome: string) {
    this.isLoading = true;

    setTimeout(() => {
      this.isLoading = false;  
      this.router.navigate(['/home']);
    }, 3000);
  }

  
 
}
