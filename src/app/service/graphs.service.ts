import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Summary } from '../classes/Summary';
import { Finance } from '../classes/Finance';

@Injectable({
  providedIn: 'root'
})
export class GraphsService {

  constructor(private http : HttpClient) { }


  url : string= 'http://localhost:8080/api/v1/';
 
      public getListEvent(month:string): Observable<HttpResponse<Summary[]>> {
       
        const params = new HttpParams().set('month', month);
       return this.http.get<Summary[]>(this.url + 'getList', {params, observe: 'response' });
    }
    
 
    public getFinance(): Observable<HttpResponse<Finance>> {
       return this.http.get<Finance>(this.url + 'getFinance', { observe: 'response' });
   }
   
}
