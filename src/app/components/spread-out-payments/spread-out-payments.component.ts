import { Component, inject, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { firstValueFrom } from 'rxjs';
import { DebitPaymentDTO } from 'src/app/classes/DebitPaymentDTO';
import { DebitService } from 'src/app/service/debit.service';

@Component({
  selector: 'app-spread-out-payments',
  templateUrl: './spread-out-payments.component.html',
  styleUrls: ['./spread-out-payments.component.css']
})
export class SpreadOutPaymentsComponent implements OnInit {

  debts: DebitPaymentDTO[] = [];  // Variabile per memorizzare i dati
  snackBar = inject(MatSnackBar);
  eventForm!: FormGroup
  totalToSave:number=0;
  inizialPrice=0;
  numberMonth:number=0;

  constructor(private debitService: DebitService, @Inject(MAT_DIALOG_DATA) public data: {}) { }
  ngOnInit(): void {
    this.eventForm = new FormGroup({
      debtSelected: new FormControl(),
      numberMonths: new FormControl()
    })

    this.getListDebtsDatabase();
   
  this.eventForm.get('debtSelected')?.valueChanges.subscribe(() => this.calculateTotal());
  this.eventForm.get('numberMonths')?.valueChanges.subscribe(() => this.calculateTotal());
}

  async getListDebtsDatabase(): Promise<void> {
    try {
      const response = await firstValueFrom(this.debitService.listDebts());
      this.debts = response;
      this.debts.forEach(element => {
        new DebitPaymentDTO(element.debitID, element.data, element.description, element.valueStart, element.valueFinish, element.settled)
      });
    } catch (error) { }
  }

  calculateTotal(): void {
    const debt = this.eventForm.get('debtSelected')?.value;
    const months = this.eventForm.get('numberMonths')?.value;
    this.inizialPrice=debt.valueStart
    if (months > 0) {
      this.totalToSave= (debt.valueStart/months);
      this.numberMonth = months; 
    }  
  }
}
