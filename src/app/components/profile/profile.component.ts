  import { Component, inject, OnInit, TRANSLATIONS } from '@angular/core';
  import { FormControl, FormGroup, Validators } from '@angular/forms';
  import { MatSnackBar } from '@angular/material/snack-bar';
  import { Router } from '@angular/router';
  import { firstValueFrom } from 'rxjs';
  import { AuthenticatorService } from 'src/app/service/authenticator.service';

  @Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
  })
  export class ProfileComponent implements OnInit {


    constructor(private router: Router, private authenticatorService: AuthenticatorService) { }
    profileForm!: FormGroup
    snackBar = inject(MatSnackBar);
    password?:string
    email?:string 
    ngOnInit(): void {

      this.profileForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(3)]),
      });
      
    }

    
    async onSubmit() {
      try {
        if (this.profileForm.valid) {
          const password = this.profileForm.get('password')?.value!;
          const email = this.profileForm.get('email')?.value!;
    
          const response = await firstValueFrom(this.authenticatorService.changePassword(password, email));
          console.log(response);
    
          // Puoi eventualmente reindirizzare l'utente qui
          // setTimeout(() => {
          //   this.router.navigate(['/home']);
          // }, 3000);
        }
      } catch (error) {
        console.error(error);
      }
    }
    
    setFormDisabled(disabled: boolean): void { // disabled form after send the event
      // Itera su ogni controllo del FormGroup dichiarati sopra
      Object.keys(this.profileForm.controls).forEach(key => {
        const control = this.profileForm.get(key);
        if (control) {
          disabled ? control.disable() : control.enable();
        }
      });
    }



  }
