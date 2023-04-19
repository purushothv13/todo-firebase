import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { ApiService } from 'src/app/shared/api.service';

@Component({ templateUrl: 'admin.component.html' })
export class AdminComponent implements OnInit {

  currentUser:any;
  allUsers:any;

  constructor(private authService: AuthService ,private apiService:ApiService) {   }

  ngOnInit() {

      this.apiService.getUsers().subscribe(users=>{
        this.allUsers=users;
      });

      this.authService.currentUser.subscribe((result)=>{
        this.currentUser=result;
      });
     }

     logout(){
      return this.authService.logout();
    };
    }

