import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Type } from 'src/app/classes/Type';
import { debit_event_subjects } from 'src/app/service/debit_event_subject'

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit,OnDestroy  {

  typeEvent = Object.values(Type); // prendi i valori dell'enum 
  eventForm!: FormGroup
  percentage: number[] = [10,20,30,40,50,60,70,80,90,100]

  private dataSubjectSubscription!: Subscription;

  constructor(private debitEventSubject: debit_event_subjects) { }  // dichiare il subject che mi collega evento e debito x mostrarlo nel html



  ngOnInit(): void {
    // Inizializzo il FormGroup con un FormArray vuoto per i giorni del mese
    this.eventForm = new FormGroup({
      description : new FormControl(),
      value : new FormControl(),
      percentageSaveMoney : new FormControl(0),
      savedMoney : new FormControl(),
      objective : new FormControl(false),
      typeEvent : new FormControl(),
 
    });

    this.eventForm.get('typeEvent')?.valueChanges.subscribe(value => {
      if (value === 'SPESA') {
        this.eventForm.get('savedMoney')?.setValue(false);
      }
    });


         // Sottoscrivi al Subject
        this.dataSubjectSubscription = this.debitEventSubject.getDataSubject().subscribe(data => {
          console.log('Received data:', data); // Sostituisci con la logica desiderata
        });
  }

  onSubmit() {
   if (this.eventForm.valid) {
    this.setFormDisabled(true);
    }

    console.log(this.eventForm.value);
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
 

  }
