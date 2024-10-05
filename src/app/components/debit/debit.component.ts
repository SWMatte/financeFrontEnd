import { Component, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DebitPayment } from '../../classes/DebitPayment';
import { DebitService } from 'src/app/service/debit.service';
import { firstValueFrom } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-debit',
  templateUrl: './debit.component.html',
  styleUrls: ['./debit.component.css']
})
export class DebitComponent {

  // Enable form to build a debit 
  debitForm!: FormGroup
  snackBar = inject(MatSnackBar);


  constructor(private debitService: DebitService, private router: Router) { } // call to the service for method of debit and router to move in the components

  ngOnInit(): void {

    this.debitForm = new FormGroup({
      description: new FormControl(),
      valueStart: new FormControl()
    });

  }

  buildResponse(debitForm: FormGroup) { // build the response to use for the backend based of the parameter required
    return new DebitPayment(debitForm.get('description')?.value, debitForm.get('valueStart')?.value);
  }


  async onSubmit() {
    // Controllo validità del form
    if (this.debitForm.valid) {
      this.setFormDisabled(true); // Disabilita il form durante l'operazione
      try {
        
        const response = await firstValueFrom(this.debitService.addDebit(this.buildResponse(this.debitForm)));
         if (response.status === 200) {
          this.openSnackBar("Debito aggiunto con successo");
        } else {
           if (response.status === 400) {
            this.openSnackBar("Errore nel salvataggio del debito, riprovare!");
          } else if (response.status === 500) {
            this.openSnackBar("Errore interno del server, riprovare!");
          } else {
            this.openSnackBar("Errore sconosciuto, riprovare!");
          }
        }
      } catch (error) {
         
        console.error("Errore durante il salvataggio del debito:", error);
        this.openSnackBar("Errore imprevisto, riprovare!");
      }  
    }
  }
  

  setFormDisabled(disabled: boolean): void { // disabled form after send the event
    // Itera su ogni controllo del FormGroup dichiarati sopra
    Object.keys(this.debitForm.controls).forEach(key => {
      const control = this.debitForm.get(key);
      if (control) {
        disabled ? control.disable() : control.enable();
      }
    });
  }



  openSnackBar(message: string) { // open the message after send the event
    this.snackBar.open(message);
    setTimeout(() => {
      this.snackBar.dismiss();
      this.router.navigate(['/home']);
    }, 3000);
  }





}





