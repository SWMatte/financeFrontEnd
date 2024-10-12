import { Injectable } from '@angular/core';
 import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DebitPayment } from '../classes/DebitPayment';
import { DebitPaymentDTO } from '../classes/DebitPaymentDTO';
import { DebitoDTO } from '../classes/DebitoDTO';
@Injectable({
  providedIn: 'root'
})
export class DebitService {

  constructor(private http : HttpClient) { }


  url : string= 'http://localhost:8080/api/v1/';

  public listDebts():Observable<DebitPaymentDTO[]>{
     
        return this.http.get<DebitPaymentDTO[]>(this.url+'getListDebts');
  }


  public reduceDebit(idDebit: number): Observable<HttpResponse<void>> {
    const params = new HttpParams().set('idDebit', idDebit.toString());
    return this.http.get<void>(this.url + 'reduceDebit', { params, observe: 'response' });
  }
  


  public addDebit(body: DebitPayment): Observable<HttpResponse<void>> {
  
    return this.http.post<void>(`${this.url}addDebts`, body, { observe: 'response' }); /*
    { observe: 'response' } in Angular permette di osservare l'intera risposta HTTP, non solo il corpo della risposta. Ciò significa che la risposta conterrà informazioni aggiuntive, come lo status code, gli header e il corpo della risposta. 
    */ 
    }


    public getCompletedDebts():Observable<DebitPaymentDTO[]>{
      return this.http.get<DebitPaymentDTO[]>(this.url+'getCompletedDebts');
    }



    public getMoreinfoDebts(debitoID: number): Observable<HttpResponse<DebitoDTO>> {
      const params = new HttpParams().set('debitoID', debitoID.toString());
      return this.http.get<DebitoDTO>(this.url + 'getMoreinfoDebts', { params, observe: 'response' });
  }
  

}
