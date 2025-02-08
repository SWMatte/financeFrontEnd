import { Component, inject } from '@angular/core';
import {  Router } from '@angular/router';
import { firstValueFrom, lastValueFrom } from 'rxjs';
//import { LoginService } from 'src/app/service/login.service';
import { AuthenticatorService } from '../../service/authenticator.service';
import { LoginDTO } from 'src/app/classes/LoginDTO';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  messageLogin: string|undefined =""
  tokenLogin: string|undefined =""

  isLoading: boolean = false;
  snackBar = inject(MatSnackBar);

  constructor(private router: Router, private  authenticatorService: AuthenticatorService) {}

  async salvaDati(username: string, password: string) {
    this.isLoading = true;
    try {
      const response = await firstValueFrom (this.authenticatorService.login(new LoginDTO(username, password)) )
      this.messageLogin = response.body?.message
      this.tokenLogin = response.body?.token;
    
    } catch (error:any) {
      console.log(error)
       this.openSnackBar(error.error);
    }

      if (this.tokenLogin) {  
        localStorage.setItem("token", this.tokenLogin);  
      } 
    setTimeout(() => {
      this.isLoading = false;  
      this.router.navigate(['/home']);
    }, 3000);
  }

  openSnackBar(message: string) { // open the message after send the event
    this.snackBar.open(message);
    setTimeout(() => {
      this.snackBar.dismiss();
      this.router.navigate(['/home']);
    }, 3000);
  }
 }
