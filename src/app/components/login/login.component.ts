import { Component } from '@angular/core';
import {  Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
//import { LoginService } from 'src/app/service/login.service';
import { AuthenticatorService } from '../../service/authenticator.service';
import { LoginDTO } from 'src/app/classes/LoginDTO';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  messageLogin: string|undefined =""
  tokenLogin: string|undefined =""

  isLoading: boolean = false;

  constructor(private router: Router, private  authenticatorService: AuthenticatorService) {}

  salvaDati(nome: string, cognome: string) {
    this.isLoading = true;

    this.authenticatorService.login(new LoginDTO(nome, cognome)).subscribe(response => {
      this.messageLogin = response.body?.message
      this.tokenLogin = response.body?.token;
      
      if (this.tokenLogin) {  
        localStorage.setItem("token", this.tokenLogin);  
      } 
    });
    


    setTimeout(() => {
      this.isLoading = false;  
      this.router.navigate(['/home']);
    }, 3000);
  }

  
 
}
