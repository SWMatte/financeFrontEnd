import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { firstValueFrom, Subscription } from 'rxjs';
import { DebitPaymentDTO } from 'src/app/classes/DebitPaymentDTO';
import { EventRegistrationDTO } from 'src/app/classes/EventRegistrationDTO';
import { Type } from 'src/app/classes/Type';
import { DebitService } from 'src/app/service/debit.service';
import { EventService } from 'src/app/service/event.service';


@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  typeEvent = Object.values(Type); // prendi i valori dell'enum 
  eventForm!: FormGroup
  percentage: number[] = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
  debts: DebitPaymentDTO[] = [];  // Variabile per memorizzare i dati
  snackBar = inject(MatSnackBar);
 
  /**
   * *call the several services to use the backend endpoints
   * @param debitService 
   * @param eventService 
   * @param router  
   */
  constructor(private debitService: DebitService, private eventService: EventService, private router: Router) { }


  /**
   * *inizializza il form con i campi che dovra' contenere e imposto dei controlli rigidi su due campi 
   */
  ngOnInit(): void {
    this.eventForm = new FormGroup({
      description: new FormControl(),
      value: new FormControl(),
      percentageSaveMoney: new FormControl(0),
      savedMoney: new FormControl(),
      objective: new FormControl(false),
      typeEvent: new FormControl(''),
      selectedDebt: new FormControl('', Validators.required)


    });

    /**
     * ! In base al valore del tipologia evento mostra o meno determinati campi nell html
     */
    this.eventForm.get('typeEvent')?.valueChanges.subscribe(value => {
      if (value === 'SPESA') {
        this.eventForm.get('savedMoney')?.setValue(false);
      }
    });

    /**
     * ! impongo che se l'evento è un debito debba essere selezionato per forza, nel caso non ci siano debiti a DB non puoi andare avanti con la compilazione
     */
    this.eventForm.get('typeEvent')?.valueChanges.subscribe((typeEventValue) => {
      const selectedDebtControl = this.eventForm.get('selectedDebt');
     
      if (typeEventValue === 'DEBITO') {
        // Aggiungi il validatore se 'typeEvent' è 'DEBITO'
        selectedDebtControl?.setValidators(Validators.required);
        this.eventForm.get('objective')?.setValue(false);

      } else {
        // Rimuovi il validatore per altri valori
        selectedDebtControl?.clearValidators();
      }
      // Aggiorna la validità del controllo
      selectedDebtControl?.updateValueAndValidity();
    });

    // Method allow to get the values from the database about debts otherwise will show " no debts present"
    this.getListDebtsDatabase();

  }

  // build the response to send to backend
  buildResponse(eventForm: FormGroup) {
    let description!: string;
    let value!: String;
    let percentageSaveMoney!: String;
    let savedMoney!: boolean;
    let objective!: boolean;
    let typeEvent!: Type;


    description = eventForm.get('description')?.value;
    value = eventForm.get('value')?.value;
    percentageSaveMoney = this.eventForm.get('percentageSaveMoney')?.value;
    savedMoney = eventForm.get('savedMoney')?.value;
    objective = eventForm.get('objective')?.value;
    typeEvent = eventForm.get('typeEvent')?.value;

    if(typeEvent=='DEBITO'){objective=true}
     const eventRegistrationDTO = new EventRegistrationDTO(description, value, percentageSaveMoney, savedMoney, objective, typeEvent);
    return eventRegistrationDTO;
  }


  /**
   * This method allow to save a event to the database, if i've got 200 response and objective is true i reduce the debts 
   */
  async onSubmit(): Promise<void> {
    if (this.eventForm.valid) {
      this.setFormDisabled(true);
        const response = await firstValueFrom(this.eventService.sendEvent(this.buildResponse(this.eventForm)))
 

        if(response.status==200){
           this.openSnackBar("Evento aggiunto con successo",this.eventForm.get('typeEvent')?.value);
          this.eventForm.get('objective')?.setValue(true);

          if(this.eventForm.get('objective')?.value==true &&this.eventForm.get('typeEvent')?.value=='DEBITO' ){
              setTimeout(async () => {    // eseguo questo processo con 2 sec di ritardo a seguito del salvataggio nella tabella registro eventi
              try {
                 const selectedDebt = this.eventForm.get('selectedDebt')?.value; // recupero l'id del debito che voglio ridurre
                 const response = await firstValueFrom(this.debitService.reduceDebit(selectedDebt.debitID)); // invio il debito al backend

                if (response.status === 200) {
                this.openSnackBar("Debito ridotto con successo",this.eventForm.get('typeEvent')?.value);
                setTimeout(()=>{this.router.navigate(['/home'])},2000)
              } else {
                if (response.status === 400) {
                  this.openSnackBar("Errore nella riduzione  dell'evento, riprovare!",this.eventForm.get('typeEvent')?.value);
                } else if (response.status === 500) {
                  this.openSnackBar("Errore interno del server, riprovare!",this.eventForm.get('typeEvent')?.value);
                } else {
                  this.openSnackBar("Errore sconosciuto, riprovare!",this.eventForm.get('typeEvent')?.value);
                }
              }
            
            } catch (error) {
              console.log("errore" + error)
            }
          }, 2000);
        }
      }
    }
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




  async getListDebtsDatabase(): Promise<void> {
    try {
      const response = await firstValueFrom(this.debitService.listDebts());
      this.debts = response;
              this.debts.forEach(element => {
          new DebitPaymentDTO(element.debitID, element.data, element.description, element.valueStart, element.valueFinish, element.settled)
        });
     
    } catch (error) {}
  }

  openSnackBar(message: string, typeEvent:string) { // open the message after send the event
    this.snackBar.open(message);
    if(typeEvent!='DEBITO'){
    setTimeout(() => {
      this.snackBar.dismiss();
      this.router.navigate(['/home']);
    }, 3000);
  } else{
    setTimeout(() => {
       this.snackBar.dismiss();
    }, 3000);
  }
}

   
}
