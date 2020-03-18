import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from '../app/components/profile/profile.component';
import { AuthGuard } from './guard/auth.guard';
import { DashboardComponent } from '../app/components/dashboard/dashboard.component';
import { ProductdisplayComponent } from 'src/app/components/productdisplay/productdisplay.component';
import { CartComponent } from './components/cart/cart.component';
import { UpdateproductComponent } from './components/updateproduct/updateproduct.component';
import { ProductComponent } from './components/product/product.component';
import { PhoneComponent } from './components/phone/phone.component';
import { TvComponent } from './components/tv/tv.component';
import { LaptopComponent } from './components/laptop/laptop.component';
import { LoginComponent } from 'src/app/components/login/login.component';
import { RegisterComponent } from 'src/app/components/register/register.component'


const routes: Routes = [

  
  
  
  {
     path: 'productdisplay',
     component: ProductdisplayComponent
     
     
  },
  {
     path: "login",
     component: LoginComponent
  },
  {
      path: "register",
      component: RegisterComponent
  },
  {
      path: "profile",
      component: ProfileComponent
      
  },
  {
      path: "updateproduct",
      component: UpdateproductComponent
     
  },
  {
      path:"dashboard",
      component: DashboardComponent
      
  },
  {
      path:"phone",
      component: PhoneComponent
  },
      
  {
      path:"tv",
      component: TvComponent
  },
  {
      path: "laptop",
      component: LaptopComponent
  },
  {
      path: "product",
      component: ProductComponent
  },
  {
      path: "cart",
      component: CartComponent},
   
  {
    path: '**',
    redirectTo: 'productdisplay'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
