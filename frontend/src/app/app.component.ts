import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './auth/token-storage.service';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private roles: string[];
  private authority: string;
  cartProductCount: number = 0;
 
  constructor(private tokenStorage: TokenStorageService, private router :Router,private shared: SharedService) { }
 
  ngOnInit() {
    if (this.tokenStorage.getToken()) {
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
    this.shared.currentMessage.subscribe(msg=>this.cartProductCount = msg);
    this.router.navigate(['/productdisplay']);
  }

  LogOut()
  {
    this.tokenStorage.signOut();
    window.location.reload();
  }
}