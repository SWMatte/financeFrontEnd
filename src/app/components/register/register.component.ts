import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { LoginDTO } from 'src/app/classes/LoginDTO';
import { Role } from 'src/app/classes/Role';
import { AuthenticatorService } from 'src/app/service/authenticator.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private authenticatorService: AuthenticatorService, private router: Router) { } // call to the service for method of debit and router to move in the components


  // Enable form to build a debit 
  registerForm!: FormGroup
  snackBar = inject(MatSnackBar);
  roles = Object.values(Role); // Trasforma l'enum Role in un array di valori
  check: boolean = false;

  ngOnInit(): void {

    this.registerForm = new FormGroup({
      email: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('',Validators.required),
      role: new FormControl('',Validators.required)
    });

  }

  buildResponse(registerForm: FormGroup) { // build the response to use for the backend based of the parameter required
    return new LoginDTO(registerForm.get('email')?.value, registerForm.get('password')?.value, registerForm.get('role')?.value);
  }

  async onSubmit() {
    // Controllo validità del form
    if (this.registerForm.valid) {
      this.setFormDisabled(true); // Disabilita il form durante l'operazione
      try {
        const response = await firstValueFrom(this.authenticatorService.register(this.buildResponse(this.registerForm)));
        if (response.status === 200) {
          this.check = true;
          this.openSnackBar("Utente registrato correttamente, sarai reindirizzato al login");
        } else {
          if (response.status === 400) {
            this.openSnackBar("Errore nel salvataggio del debito, riprovare!");
          } else if (response.status === 500) {
            this.openSnackBar("Errore interno del server, riprovare!");
          } else {
            this.openSnackBar("Errore sconosciuto, riprovare!");
          }
        }
      } catch (error: any) {
        this.setFormDisabled(false);
        this.openSnackBar(error.error);


      }
    }
  }

  setFormDisabled(disabled: boolean): void { // disabled form after send the event
    // Itera su ogni controllo del FormGroup dichiarati sopra
    Object.keys(this.registerForm.controls).forEach(key => {
      const control = this.registerForm.get(key);
      if (control) {
        disabled ? control.disable() : control.enable();
      }
    });
  }

  openSnackBar(message: string) { // open the message after send the event
    this.snackBar.open(message);
    if (this.check==true) {
      setTimeout(() => {
        this.snackBar.dismiss();
        this.router.navigate(['/login']);
      }, 2500);
    }
  }

}
