import { Injectable } from '@angular/core';
import { HttpClient,HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Http, Response } from '@angular/http';  
import { Observable, of, throwError, pipe} from "rxjs"
import { map, filter, catchError, mergeMap, tap } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';
import { Product } from '../models/product';



const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  public listAllURL = 'http://localhost:8087/api/auth/all';
  public addTo = 'http://localhost:8087/api/auth/addToCart';
  public delProd = 'http://localhost:8087/api/auth/product/delete';
  public updP = 'http://localhost:8087/api/auth/product/update';
  public getPrI =  'http://localhost:8087/api/auth/product/gett';
  public delete = 'http://localhost:8087/api/auth/delete';
  public del = 'http://localhost:8087/api/auth/product/delete';
  public update = 'http://localhost:8087/api/auth/update';
  public getID  = 'http://localhost:8087/api/auth/get';
  public getC  = 'http://localhost:8087/api/auth/product/getcc';

  constructor(private httpClient:HttpClient, private authService:AuthenticationService) {
    this.httpClient = httpClient;
   }
 
  
   saveProduct(formData: FormData): Observable <any>
   {
        return this.httpClient.post<any>('http://localhost:8087/api/auth/saveProduct', formData);
   }

   deleteProduct(id: number): Observable<any> 
   {
     return this.httpClient.delete(`${this.del}/${id}`);
   } 
 
  getProductByCategory(category: string): Observable<Product>
  {  
    return this.httpClient.get<Product>(`${this.getC}/${category}`);  
  } 

   getAllProducts():Observable<Product[]> 
  {
    return this.httpClient.get<Product[]>(this.listAllURL);
  }

   addProducts(product: Product): Observable<Product> {  
  
    return this.httpClient.post<Product>('http://localhost:8087/api/auth/saveProduct',product);  
  } 
 
 

  getProduct(id: number): Observable<Product>
  {  
    return this.httpClient.get<Product>(`${this.getPrI}/${id}`);  
  } 

 
  deleteProducts(id: number): Observable<any> 
   {
     return this.httpClient.delete(`${this.delete}/${id}`);
   } 

   updateProducts(product: Product): Observable<Product> {  
    
    return this.httpClient.put<Product>(this.updP,product, httpOptions);  
  }
 
 
  addProductToCart(prodcuts: any) {
    localStorage.setItem("product", JSON.stringify(prodcuts));
  }
  getProductFromCart() {
    
    return JSON.parse(localStorage.getItem('product'));
  }
  removeAllProductFromCart() {
    return localStorage.removeItem("product");
  }

   
  errorHandler(error: Response) {  
    console.log(error);  
    return throwError(error);  
} 
}
