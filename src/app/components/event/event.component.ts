import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { firstValueFrom, Subscription } from 'rxjs';
import { DebitPaymentDTO } from 'src/app/classes/DebitPaymentDTO';
import { Type } from 'src/app/classes/Type';
import { DebitService } from 'src/app/service/debit.service';


@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit,OnDestroy  {

  typeEvent = Object.values(Type); // prendi i valori dell'enum 
  eventForm!: FormGroup
  percentage: number[] = [10,20,30,40,50,60,70,80,90,100]
  debts: DebitPaymentDTO[] = [];  // Variabile per memorizzare i dati

  private dataSubjectSubscription!: Subscription;

  constructor(private debitService :DebitService) { }



  ngOnInit(): void {
    // Inizializzo il FormGroup con un FormArray vuoto per i giorni del mese
    this.eventForm = new FormGroup({
      description : new FormControl(),
      value : new FormControl(),
      percentageSaveMoney : new FormControl(0),
      savedMoney : new FormControl(),
      objective : new FormControl(false),
      typeEvent : new FormControl(),
      selectedDebt: new FormControl()  

 
    });

    this.eventForm.get('typeEvent')?.valueChanges.subscribe(value => {
      if (value === 'SPESA') {
        this.eventForm.get('savedMoney')?.setValue(false);
      }
    });

    this.getListDebtsDatabase();
   
  }

  onSubmit() {
   if (this.eventForm.valid) {
    this.setFormDisabled(true);
    }

    console.log(this.eventForm.value);

    const selectedDebtId = this.eventForm.get('selectedDebt')?.value;
    console.log('ID del debito selezionato:', selectedDebtId);
  }



  setFormDisabled(disabled: boolean): void {
    // Itera su ogni controllo del FormGroup dichiarati sopra
    Object.keys(this.eventForm.controls).forEach(key => {  
      const control = this.eventForm.get(key);
      if (control) {
        disabled ? control.disable() : control.enable();
      }
    });
  }

  ngOnDestroy(): void {
    // Cancella la sottoscrizione per evitare perdite di memoria
    if (this.dataSubjectSubscription) {
      this.dataSubjectSubscription.unsubscribe();
    }
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
