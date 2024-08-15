import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DebitPayment } from '../../classes/DebitPayment';
import { DebitService } from 'src/app/service/debit.service';
import { debit_event_subjects } from 'src/app/service/debit_event_subject'
import { firstValueFrom } from 'rxjs';
import { DebitPaymentDTO } from 'src/app/classes/DebitPaymentDTO';

@Component({
  selector: 'app-debit',
  templateUrl: './debit.component.html',
  styleUrls: ['./debit.component.css']
})
export class DebitComponent {
  debts: DebitPaymentDTO[] = [];  // Variabile per memorizzare i dati
  debitForm!: FormGroup



  constructor(private debitService :DebitService, 
    private debit_event_subjects:debit_event_subjects) { }

  ngOnInit(): void {
    // Inizializzo il FormGroup con un FormArray vuoto per i giorni del mese
    this.debitForm = new FormGroup({
      description : new FormControl(),
      valueStart : new FormControl()
    });


    this.getListDebtsDatabase();
  }

  onSubmit() {
   if (this.debitForm.valid) {
    this.setFormDisabled(true);
    }

    console.log(this.debitForm.value);
  }

  setFormDisabled(disabled: boolean): void {
    // Itera su ogni controllo del FormGroup dichiarati sopra
    Object.keys(this.debitForm.controls).forEach(key => {  
      const control = this.debitForm.get(key);
      if (control) {
        disabled ? control.disable() : control.enable();
      }
    });
  }

 
 async getListDebtsDatabase(): Promise<void> {
    try {
      const response = await firstValueFrom(this.debitService.listDebts());
      this.debts = response;  
      
      this.debts.forEach(element => {
        new DebitPaymentDTO(element.debitID,element.data,element.description,element.valueStart,element.valueFinish,element.settled)
       });
       
      console.log(response + " RESPONSE DATABASE");
    } catch (error) {
      console.log(error);
    }
  }

}



 