import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SummaryDTO } from 'src/app/classes/SummaryDTO';

@Injectable({
  providedIn: 'root'
})
export class DataServiceBehaviorSubj {
  private graphArraySubject = new BehaviorSubject<SummaryDTO[]>([]); // BehaviorSubject con un array iniziale vuoto

  // Metodo per aggiornare il BehaviorSubject
  setGraphArray(data: SummaryDTO[]) {
    this.graphArraySubject.next(data);  // emetti nuovi dati
  }

  // Metodo per esporre il BehaviorSubject come Observable (solo in lettura)
  getValue() {
    return this.graphArraySubject.asObservable();  // restituisce un Observable
  }
}
