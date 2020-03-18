import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductdisplayComponent } from './components/productdisplay/productdisplay.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProductComponent } from './components/product/product.component';
import {UpdateproductComponent} from './components/updateproduct/updateproduct.component';
import { FilterPipe } from './filter.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatButtonModule, MatMenuModule, MatDatepickerModule,MatNativeDateModule , MatIconModule, MatCardModule, MatSidenavModule,MatFormFieldModule, MatInputModule, MatTooltipModule, MatToolbarModule } from '@angular/material';  
import { MatRadioModule } from '@angular/material/radio';
import { LaptopComponent } from './components/laptop/laptop.component';
import { TvComponent } from './components/tv/tv.component';
import { PhoneComponent } from './components/phone/phone.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';







@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CartComponent,
    ProductdisplayComponent,
    ProfileComponent,
    ProductComponent,
    UpdateproductComponent,
    FilterPipe,
    LaptopComponent,
    TvComponent,
    PhoneComponent,
    RegisterComponent,
    LoginComponent
    
    //LoginComponent
    
   
   
    
  
    
  ],
  imports: [
    BrowserModule,
    Ng2SearchPipeModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,  
    MatMenuModule,  
    MatDatepickerModule,  
    MatNativeDateModule,  
    MatIconModule,  
    MatRadioModule,  
    MatCardModule,  
    MatSidenavModule,  
    MatFormFieldModule,  
    MatInputModule,  
    MatTooltipModule,  
    MatToolbarModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
