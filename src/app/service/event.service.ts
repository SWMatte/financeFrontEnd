import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventRegistrationDTO } from '../classes/EventRegistrationDTO';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  constructor(private http : HttpClient) { }
  url : string= 'http://localhost:8080/api/v1/';

  

    public sendEvent(body: EventRegistrationDTO):  Observable<HttpResponse<void>> {
  
    return this.http.post<void>(`${this.url}addEvent`, body, { observe: 'response' });  
    
    
    }

 
 }
