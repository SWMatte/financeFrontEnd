import { Injectable } from '@angular/core';
 import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DebitPayment } from '../classes/DebitPayment';
import { DebitPaymentDTO } from '../classes/DebitPaymentDTO';
@Injectable({
  providedIn: 'root'
})
export class DebitService {

  constructor(private http : HttpClient) { }


  url : string= 'http://localhost:8080/api/v1/';

  public listDebts():Observable<DebitPaymentDTO[]>{
     
        return this.http.get<DebitPaymentDTO[]>(this.url+'getListDebts');
  }


  public reduceDebit(idDebit: number): Observable<void> {
    const params = new HttpParams().set('idDebit', idDebit.toString());
    return this.http.get<void>(this.url + 'reduceDebit',{ params });
  }

}
