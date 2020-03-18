import { Component, OnInit } from '@angular/core';
 
import { AuthenticationService } from 'src/app/services/authentication.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { Logininfo } from 'src/app/auth/logininfo';
import { Router, ActivatedRoute } from '@angular/router';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  private loginInfo: Logininfo;
  returnUrl: string;

 
  constructor( private route: ActivatedRoute,private authService: AuthenticationService, private tokenStorage: TokenStorageService, private router: Router) { }
 
  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getAuthorities();
    }

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/productdisplay';
  }
 
  onSubmit() {
    console.log(this.form);
 
    this.loginInfo = new Logininfo(
      this.form.username,
      this.form.password);
 
    this.authService.ValidateUser(this.loginInfo).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUsername(data.username);
        this.tokenStorage.saveAuthorities(data.authorities);
 
        this.isLoginFailed = false;
        
        this.roles = this.tokenStorage.getAuthorities();
        this.reloadPage();
        this.router.navigateByUrl(this.returnUrl);
        
      },
      error => {
        console.log(error);
        this.errorMessage = 'Either user name or password is incorrect.';
        this.isLoginFailed = true;
      }
    );
  }

navigate()
{
  if(this.isLoggedIn=true)
  {
  this.router.navigate(['/productdisplay']);
  }
}
 
  reloadPage() {
    window.location.reload();
  }
}