import { Injectable } from '@angular/core';
import { HttpClient,HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Http, Response } from '@angular/http';  
import { Observable, of, throwError, pipe} from "rxjs"
import { map, filter, catchError, mergeMap } from 'rxjs/operators';
import { OrderDetails } from '../models/order-details';
import { OrderItem } from '../models/order-item';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  public apiURL = "http://localhost:8087/api/auth/save";
  public items = "http://localhost:8087/api/auth/saveOderItem";

  constructor(private httpClient:HttpClient) { }

  PlaceOrder (orderDetail:OrderDetails)
  {
    return this.httpClient.post(this.apiURL,orderDetail,httpOptions)
    .pipe(
      map(res => res),
       catchError( this.errorHandler)
      );

    
  }

  orderItemsCart(orderItem: OrderItem)
  {  
    return this.httpClient.post(this.items,orderItem, httpOptions)
    .pipe(map(
      res => res
    ),
    catchError(this.errorHandler)
    );
  }
 
  errorHandler(error: Response) {  
    console.log(error);  
    return throwError(error);  
} 
}