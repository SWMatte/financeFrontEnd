import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
   * *inizializza il form con i campi che dovra' contenere 
   */
  ngOnInit(): void {
    this.eventForm = new FormGroup({
      description: new FormControl(),
      value: new FormControl(),
      percentageSaveMoney: new FormControl(0),
      savedMoney: new FormControl(),
      objective: new FormControl(false),
      typeEvent: new FormControl(),
      selectedDebt: new FormControl()


    });

    /**
     * ! In base al valore del tipologia evento mostra o meno determinati campi nell html
     */
    this.eventForm.get('typeEvent')?.valueChanges.subscribe(value => {
      if (value === 'SPESA') {
        this.eventForm.get('savedMoney')?.setValue(false);
      }
    });

    // allow to get the values from the database about debts otherwise will show " no debts present"
    this.getListDebtsDatabase();

  }

  // build the response to the backend
  buildResponse(eventForm: FormGroup) {
    let description!: string;
    let value!: String;
    let percentageSaveMoney!: String;
    let savedMoney!: boolean;
    let objective!: boolean;
    let typeEvent!: Type;


    description = this.eventForm.get('description')?.value;
    value = this.eventForm.get('value')?.value;
    percentageSaveMoney = this.eventForm.get('percentageSaveMoney')?.value;
    savedMoney = this.eventForm.get('savedMoney')?.value;
    objective = this.eventForm.get('objective')?.value;
    typeEvent = this.eventForm.get('typeEvent')?.value;
    const eventRegistrationDTO = new EventRegistrationDTO(description, value, percentageSaveMoney, savedMoney, objective, typeEvent);
    return eventRegistrationDTO;
  }


  async onSubmit(): Promise<void> {
    if (this.eventForm.valid) {
      this.setFormDisabled(true);

      const response = await firstValueFrom(this.eventService.sendEvent(this.buildResponse(this.eventForm)))

      if (this.eventForm.get('objective')?.value == false) {

        if (response.status === 200) {
          this.openSnackBar("Evento aggiunto con successo");
        } else {
          if (response.status === 400) {
            this.openSnackBar("Errore nel salvataggio dell'evento, riprovare!");
          } else if (response.status === 500) {
            this.openSnackBar("Errore interno del server, riprovare!");
          } else {
            this.openSnackBar("Errore sconosciuto, riprovare!");
          }
        }
      } else {
        console.log(this.eventForm.get('objective')?.value)
        if (this.eventForm.get('objective')?.value == 'true') {  // se imposto che voglio utilizzare il valore x il debito recupero l'id e lo mando al back dopo un ritardo di 2 sec che mi permette di salvare l'evento x usare poi il value associato come da logica

          setTimeout(async () => {    // eseguo questo processo con 2 sec di ritardo a seguito del salvataggio nella tabella registro eventi
            try {
              const selectedDebt = this.eventForm.get('selectedDebt')?.value; // recupero l'id del debito che voglio ridurre
              const response = await firstValueFrom(this.debitService.reduceDebit(selectedDebt.debitID)); // invio il debito al backend
              if (response.status === 200) {
                this.openSnackBar("Debito ridotto con successo");
              } else {
                if (response.status === 400) {
                  this.openSnackBar("Errore nella riduzione  dell'evento, riprovare!");
                } else if (response.status === 500) {
                  this.openSnackBar("Errore interno del server, riprovare!");
                } else {
                  this.openSnackBar("Errore sconosciuto, riprovare!");
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

      if (response.length == 0) {
        this.debts.push(new DebitPaymentDTO(undefined, undefined, "NO DEBITI A DB", undefined, undefined, undefined))

      } else {
        this.debts.forEach(element => {
          new DebitPaymentDTO(element.debitID, element.data, element.description, element.valueStart, element.valueFinish, element.settled)
        });
      }

    } catch (error) {
      console.log(error)

    }
  }

  openSnackBar(message: string) { // open the message after send the event
    this.snackBar.open(message);
    setTimeout(() => {
      this.snackBar.dismiss();
      this.router.navigate(['/home']);
    }, 3000);
  }
}
