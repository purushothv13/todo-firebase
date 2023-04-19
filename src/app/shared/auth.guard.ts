import { Injectable } from '@angular/core';
import {  CanActivate, Router } from '@angular/router';
import Toast from 'awesome-toast-component';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor (private authservice:AuthService , private router:Router ){}

  canActivate(){
    if(this.authservice.LoggedIn())
    {
      return true;
    }
    new Toast(`You are not LoggedIn`, {
      position: 'top'});

    this.router.navigate(['']);
    return false;
  }

}
