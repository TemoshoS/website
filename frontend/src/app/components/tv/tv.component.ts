import { Component, OnInit } from '@angular/core';
import { ProductDisplay } from 'src/app/models/product-display';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';
import { Alert } from 'src/app/models/alert';
import { SharedService } from 'src/app/services/shared.service';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { TokenStorageService } from 'src/app/auth/token-storage.service';

@Component({
  selector: 'app-tv',
  templateUrl: './tv.component.html',
  styleUrls: ['./tv.component.css']
})
export class TvComponent implements OnInit {

  public alerts: Array<Alert> = [];
  cartItemCount: number = 0;
  @Output() cartEvent = new EventEmitter<number>();
  public globalResponse: any;
  yourByteArray:any;
  allProducts: ProductDisplay[];
  productAddedTocart:Product[];
  roles: string[] = [];
  private authority: string;
  cat: string;
  success: boolean =false;
  
  constructor(private productService:ProductService,private sharedService:SharedService, private sanitizer: DomSanitizer,private tokenStorage: TokenStorageService) { }


  
  ngOnInit() {
    
    this.getCategory(this.cat="TV");

    if (this.tokenStorage.getToken()) 
    {
      this.roles = this.tokenStorage.getAuthorities();
      this.roles.every(role => {
        if (role === 'ROLE_ADMIN') {
          this.authority = 'admin';
          return false;
        } else if (role === 'ROLE_CUSTOMER') {
          this.authority = 'customer';
          return false;
        }
        this.authority = 'user';
        return true;
      });
    }
       

 }

 deleteProduct(productId: number) {  
  if (confirm("Are you sure you want to delete this ?")) {   
  this.productService.deleteProduct(productId).subscribe(() => {  
    this.success=true;

  },
  error => { //This is error part
    console.log(error.message);
    this.alerts.push({
      id: 2,
      type: 'danger',
      message: 'Product is not deleted'
    });
  },
  () => {
    
      //  This is Success part
      this.alerts.push({
        id: 1,
        type: 'success',
        message: 'Product is deleted successfully',
      });
      
      }
    )

 
}  
} 



getCategory(category: string)
{
  let Product:any={};
 
  if(Product.category="TV"){
  this.productService.getProductByCategory(category)
  .subscribe((products) => {
    this.globalResponse = products;  
    console.log(products);   
             
  },
  error => { 
    console.log(error.message);
  },
  () => {
      
      console.log("Product fetched ");
      this.allProducts=this.globalResponse;
      
      }
    )
 }



}


 OnAddCart(product:Product)
 {
   console.log(product);
   
   this.productAddedTocart=this.productService.getProductFromCart();
   if(this.productAddedTocart==null)
   {
     this.productAddedTocart=[];
     this.productAddedTocart.push(product);
     this.productService.addProductToCart(this.productAddedTocart);
     this.alerts.push({
       id: 1,
       type: 'success',
       message: 'Product added to cart.'
     });
     setTimeout(()=>{   
       this.closeAlert(this.alerts);
  }, 3000);

   }
   else
   {
     let Products=this.productAddedTocart.find(p=>p.id==product.id);
     if(Products==null)
     {
       this.productAddedTocart.push(product);
       this.productService.addProductToCart(this.productAddedTocart);
       this.alerts.push({
         id: 1,
         type: 'success',
         message: 'Product added to cart.'
       });
       
       setTimeout(()=>{   
         this.closeAlert(this.alerts);
    }, 3000);
     }
     else
     {
       this.alerts.push({
         id: 2,
         type: 'warning',
         message: 'Product already exist in cart.'
       });
       setTimeout(()=>{   
         this.closeAlert(this.alerts);
    }, 3000);
     }
     
   }
   
   this.cartItemCount=this.productAddedTocart.length;
   
   this.sharedService.updateCartCount(this.cartItemCount);
 }
 public closeAlert(alert:any) {
   const index: number = this.alerts.indexOf(alert);
   this.alerts.splice(index, 1);
} 
}
