import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginDTO } from '../classes/LoginDTO';
import { LoginResponseDTO } from '../classes/LoginResponseDTO';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatorService implements HttpInterceptor {

  constructor(private http : HttpClient) { }

  url : string= 'http://localhost:8080/api/v1/';


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem("token");
     if(token){
     const modifiedRequest= req.clone({
        headers:req.headers.set('Authorization', `Bearer ${token}`)
      })
      return next.handle(modifiedRequest);
    } else{
      return next.handle(req)
    }

  }


  
  public login(body:LoginDTO ): Observable<HttpResponse<LoginResponseDTO>> {
    return this.http.post<LoginResponseDTO>(`${this.url}login`, body, { observe: 'response' });  
    }

    
    public register(body:LoginDTO ): Observable<HttpResponse<any>> {
      return this.http.post<any>(`${this.url}register`, body, { observe: 'response' });  
      }
  

    
}
