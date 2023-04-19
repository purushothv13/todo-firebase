import { Component, OnInit } from '@angular/core';
import Toast from 'awesome-toast-component';
import { GoogleAuthProvider } from 'firebase/auth';

import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email:string='';
  password:string='';

  provider:any;
  fireauth: any;

  constructor(private auth:AuthService,private router:Router) {

  }

  ngOnInit(): void {

    const provider = new GoogleAuthProvider();
    this.provider=provider;

  }

  login(){
    if(this.email==''){
      new Toast(`Please Enter EmailID`, {
        position: 'top'});
        return;
    }

    if(this.password==''){
      new Toast(`Please Enter Password`, {
        position: 'top'});
        return;
    }

    this.auth.login(this.email,this.password);

    this.email='';
    this.password='';
  }

  loginwithGmail(){
return this.auth.loginwithgmail();

  }

}
