import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { DebitPayment } from "../classes/DebitPayment";

@Injectable({
    providedIn: 'root'  
  })
export class debit_event_subjects{
    
    private dataSubject = new Subject<DebitPayment>();


    sendData(data:DebitPayment){
        this.dataSubject.next(data);
    }


    getDataSubject(){
       return this.dataSubject.asObservable();
    }
}