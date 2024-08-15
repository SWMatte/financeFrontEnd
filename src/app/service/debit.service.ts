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
    let queryParams = new HttpParams();
        return this.http.get<DebitPaymentDTO[]>(this.url+'getListDebts');
  }
}
