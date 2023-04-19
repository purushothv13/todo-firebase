import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  todos:any;
  userId: any;
  selectedUser: any;
  user: any;

  constructor(
    private apiService:ApiService,
    private activateRoute:ActivatedRoute
   ) {}

  ngOnInit() {
    const userid = this.activateRoute.snapshot.paramMap.get('id');

    this.apiService.getUser(userid).subscribe(user => {
      this.user = user;

     });
     this.apiService.getTodosofUser(userid).subscribe(todos => {
      this.todos = todos;
     });
  };
}
