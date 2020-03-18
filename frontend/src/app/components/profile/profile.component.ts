import { Component, OnInit } from '@angular/core';
import { Singup } from 'src/app/auth/singup';
import { Validators, FormBuilder } from '@angular/forms';
import { TokenStorageService } from 'src/app/auth/token-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  id:number;
  user: Singup;
  userForm: any;  

  constructor(private fb: FormBuilder,private token:TokenStorageService) { }

  ngOnInit() {
    this.userForm = this.fb.group({  
      username: ['', []], 
      
    }); 

    this.userForm.controls['username'].setValue(this.token.getUsername());  

}
}
