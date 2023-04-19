import { Component, OnInit } from '@angular/core';
import Toast from 'awesome-toast-component';
import { ApiService } from 'src/app/shared/api.service';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name:string='';
  email:string='';
  password:string='';

  constructor(private api:ApiService,private auth:AuthService) { }

  ngOnInit(): void {
  }

  register(){
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

    this.auth.registerUser(this.email,this.password);

    this.email='';
    this.password='';
  }

}
