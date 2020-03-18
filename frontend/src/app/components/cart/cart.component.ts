import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { Alert } from 'src/app/models/alert';
import { OrderDetails } from 'src/app/models/order-details';
import { User} from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { OrderService } from 'src/app/services/order.service';
import { OrderItem } from 'src/app/models/order-item';
import { Addressinfo } from 'src/app/auth/addressinfo';
import { Observable } from 'rxjs'; 
import { TokenStorageService} from 'src/app/auth/token-storage.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  dataSaved = false;  
  defaultQuantity:number=1;
  productAddedTocart:Product[];
  allTotal:number;
  currentUser: User[];
  orderDetail:OrderDetails;
  orderItem:OrderItem[];
  orderItems:OrderItem;
  form: any = {};  
  address: Addressinfo;
  success:boolean = false;
  
  
   

  public globalResponse: any;
  public alerts: Array<Alert> = [];

  deliveryForm:FormGroup;


  constructor(private router: Router,private productService:ProductService,private fb: FormBuilder,private orderService: OrderService, private token:TokenStorageService) 
  {
    
   }
   onSubmit()
   {
 
   }

   reload()
   {
   window.location.reload();
   this.router.navigate(['/cart'])
    
    
   }

  ngOnInit() {
    this.productAddedTocart=this.productService.getProductFromCart();
    for (let i in this.productAddedTocart) {
      this.productAddedTocart[i].prodquantity=this.productAddedTocart[i].prodquantity;
   }
   this.productService.removeAllProductFromCart();
   this.productService.addProductToCart(this.productAddedTocart);
   this.calculteAllTotal(this.productAddedTocart);
  

   

   this.deliveryForm = this.fb.group({
    username:  ['', [Validators.required]],
    deliveryaddress:['',[Validators.required]],
    phone:['',[Validators.required, Validators.minLength(10),Validators.pattern("^[0-9]*$"),Validators.maxLength(10)]],
    email: ['', [Validators.required, Validators.email]],
    amount:['',[Validators.required]],

  });

  this.deliveryForm.controls['username'].setValue(this.token.getUsername());
  this.deliveryForm.controls['amount'].setValue(this.allTotal);
  }

  //delete product by id
  deletProduct()
  {
  this.productService.removeAllProductFromCart();
  }

  get email() 
  {
     return this.deliveryForm.get('email'); 
  }
  onAddQuantity(product:Product)
  {
    //Get Product
    this.dataSaved = true;
    this.productAddedTocart=this.productService.getProductFromCart();
    this.productAddedTocart.find(p=>p.id==product.id).prodquantity = product.prodquantity+1;
    
  this.productService.removeAllProductFromCart();
  this.productService.addProductToCart(this.productAddedTocart);
  this.calculteAllTotal(this.productAddedTocart);
  this.deliveryForm.controls['amount'].setValue(this.allTotal);
  
   
  }
  onRemoveQuantity(product:Product)
  {
    this.dataSaved = true;
    this.productAddedTocart=this.productService.getProductFromCart();
    this.productAddedTocart.find(p=>p.id==product.id). prodquantity = product.prodquantity-1;
    this.productService.removeAllProductFromCart();
    this.productService.addProductToCart(this.productAddedTocart);
    this.calculteAllTotal(this.productAddedTocart);
    this.deliveryForm.controls['amount'].setValue(this.allTotal);
    

  }
  calculteAllTotal(allItems:Product[])
  {
    this.dataSaved = true;
    let total=0;
    for (let i in allItems) {
      total= total+(allItems[i].prodquantity *allItems[i].prodprice);
   }
   this.allTotal=total;
   
  }

 itemsInCart(product: OrderItem)
 {
    this.orderService.orderItemsCart(product);
 }
  
  deleteProduct(id: number){

    this.dataSaved = true;
     var products = JSON.parse(localStorage["product"]);
     var i;
    
     var x = localStorage.getItem("product");
    for (i=0;i<products.length;i++)
               
    if (products[i].id == id) products.splice(i,1);
    localStorage["product"] = JSON.stringify(products);
    localStorage.setItem("product",JSON.stringify(products));
      
  }

  resetForm()
  {
    this.deliveryForm.reset();
    this.dataSaved = false;
  }
  ConfirmOrder()
  {
    const date: Date = new Date();
    var name=this.token.getUsername();
    var day = date.getDate();
    var monthIndex = date.getMonth()+1;
    var year = date.getFullYear();
    var minutes = date.getMinutes();
    var hours = date.getHours();
    var seconds = date.getSeconds();
    var dateTimeStamp=day.toString()+"-"+monthIndex.toString()+"-"+year.toString()+" "+hours.toString()+":"+minutes.toString()+":"+seconds.toString();;
    let orderDetail:any={};
    let orderItems:any={};
    
    //Orderdetail is object which hold all the value, which needs to be saved into database
    orderDetail.username=this.deliveryForm.controls['username'].value;
    orderDetail.deliveryaddress=this.deliveryForm.controls['deliveryaddress'].value;
    orderDetail.phone=this.deliveryForm.controls['phone'].value;
    orderDetail.paymentrefrenceid= name + dateTimeStamp;
    orderDetail.orderpaymethod = "Pay On Delivery";
    orderDetail.totprice = this.deliveryForm.controls['amount'].value;
    orderDetail.email = this.deliveryForm.controls['email'].value;

    
    
    //Assigning the ordered item details
    this.orderItem=[];
    for (let i in this.productAddedTocart) {
      this.orderItem.push({
        id:0,
        productid:this.productAddedTocart[i].id,
        productname:this.productAddedTocart[i]. prodname,
        orderedquantity:this.productAddedTocart[i].prodquantity,
        price:this.productAddedTocart[i]. prodprice,
        orderid:0,
      }) ;
   }
     




   orderDetail.orderlist=this.orderItem;
   

   
    this.orderService.orderItemsCart(orderItems).subscribe(() => {  
      this.dataSaved = true;  
      for(let x in this.productAddedTocart)
      {
        orderItems.productid = this.productAddedTocart[x].id;
        orderItems.productname = this.productAddedTocart[x].prodname;
        orderItems.orderedquantity = this.productAddedTocart[x].prodquantity;
        orderItems.price = 9;

      }
     
  
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
  
   
 
                           












 
    this.orderService.PlaceOrder(orderDetail)
            .subscribe((result) => {
              this.globalResponse = result;              
            },
            error => { //This is success part
              console.log(error.message);
              this.alerts.push({
                id: 2,
                type: 'success',
                message: 'Order has been placed succesfully.',
                        
              });
            },
            () => {
                //  This is error part
                this.alerts.push({
                  id: 1,
                  

                
                type: 'danger',
                message: 'Something went wrong while placing the order, Please try again.'

                  
                });
                
                }
              )

  }
  public closeAlert(alert: Alert) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
} 

}