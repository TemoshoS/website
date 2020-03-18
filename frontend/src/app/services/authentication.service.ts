import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Logininfo } from '../auth/logininfo';
import { Jwtresponse } from '../auth/jwtresponse';
import { Singup } from '../auth/singup';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  
  private apiURL = 'http://localhost:8087/api/auth/signin';
  private signupUrl = 'http://localhost:8087/api/auth/signup';
 

  constructor(private httpClient:HttpClient) { }
 
  signUp(info: Singup): Observable<string> {
    return this.httpClient.post<string>(this.signupUrl, info, httpOptions);
  }


  ValidateUser (credentials:Logininfo): Observable<Jwtresponse> 
  {
    
    return this.httpClient.post<Jwtresponse>(this.apiURL,credentials,httpOptions )
    .pipe(
      map(res => res),
       catchError( this.errorHandler)
      );
  }
errorHandler(error: Response)
{  
    console.log(error);  
    return throwError(error);  
} 
}
