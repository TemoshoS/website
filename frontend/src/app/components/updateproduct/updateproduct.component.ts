import { Component, OnInit } from '@angular/core';  
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';  
import { Observable } from 'rxjs';  
import { ProductService } from 'src/app/services/product.service';  
import { Product } from 'src/app/models/product';  
import { Producdto } from 'src/app/auth/producdto';
import { Alert } from 'src/app/models/alert';
import { ActivatedRoute, Router } from '@angular/router';

  
@Component({  
  selector: 'app-updateproduct',  
  templateUrl: './updateproduct.component.html',  
  styleUrls: ['./updateproduct.component.css']  
})  
export class UpdateproductComponent implements OnInit { 

  public globalResponse: any; 
  public alerts: Array<Alert> = [];
  dataSaved = false;  
  productForm: any;  
  allProduct: Observable<Product[]>;   
  productIdUpdate = null;
  
 
  
  constructor(private fb: FormBuilder, private productService:ProductService,private route: ActivatedRoute) { }  
  
  ngOnInit() {  
    this.productForm = this.fb.group({  
      prodname: ['', [Validators.required]],  
      proddecription: ['', [Validators.required]],  
      prodprice: ['', [Validators.required]],  
      category: ['', [Validators.required]],  
      prodquantity: ['', [Validators.required]],
       
      
    });  
    
    this.loadallProduct();  
  }  
  loadallProduct() {  
    this.allProduct = this.productService.getAllProducts();  
  }  
  onFormSubmit() {  
    this.dataSaved = false;  
    const product = this.productForm.value;  
    this.CreateProduct(product);  
    this.productForm.reset();  
  }  
 
  loadProductToEdit(productId: number) {  

    
    this.productService.getProduct(productId).subscribe(product=> {  
       
      this.dataSaved = false; 
      this.productIdUpdate = product.id;
      this.productForm.controls['prodname'].patchValue(product.prodname);  
      this.productForm.controls['proddecription'].patchValue(product.proddecription);  
      this.productForm.controls['prodprice'].patchValue(product.prodprice);  
      this.productForm.controls['category'].patchValue(product.category);  
      this.productForm.controls['prodquantity'].patchValue(product.prodquantity); 

      
  
      
     
    });  
  
  }  


  CreateProduct(product: Product) {  
    if (this.productIdUpdate == null) {  
      this.productService.addProducts(product).subscribe(  
        () => {  
          this.dataSaved = true;  
           
          this.loadallProduct();  
          this.productIdUpdate = null;  
          this.productForm.reset();  
        }  
      );  
    } else {  
      product.id = this.productIdUpdate;  
      this.productService.updateProducts(product).subscribe(() => {  
        this.dataSaved = true;  
        this.loadallProduct();  
        this.productIdUpdate = null;  
        this.productForm.reset();  
      },
      error => { //This is error part
        console.log(error.message);
        this.alerts.push({
          id: 2,
          type: 'danger',
          message: 'Product is not updated'
        });
      },
      () => {
        
          //  This is Success part
          this.alerts.push({
            id: 1,
            type: 'success',
            message: 'Product is updated successfully',
          });
          
          }
        )
    
     
    }  
  }    

  deleteProducts(productId: number) {  
    if (confirm("Are you sure you want to delete this ?")) {   
    this.productService.deleteProduct(productId).subscribe(() => {  
      this.dataSaved = true;  
      this.loadallProduct();  
      this.productIdUpdate = null;  
      this.productForm.reset();  
  
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
   
  resetForm() {  
    this.productForm.reset();   
    this.dataSaved = false;  
  }  


  public closeAlert(alert: Alert) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
} 
}