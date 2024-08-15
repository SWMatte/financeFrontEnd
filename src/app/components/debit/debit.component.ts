import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-debit',
  templateUrl: './debit.component.html',
  styleUrls: ['./debit.component.css']
})
export class DebitComponent {

  debitForm!: FormGroup
  constructor() { }


  ngOnInit(): void {
    // Inizializzo il FormGroup con un FormArray vuoto per i giorni del mese
    this.debitForm = new FormGroup({
      description : new FormControl(),
      valueStart : new FormControl()
    });
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

 
}
