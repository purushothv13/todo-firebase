import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';
import Toast from 'awesome-toast-component'
import { AuthService } from 'src/app/shared/auth.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  todos:any;
  currentUser:any;


  constructor(private api:ApiService , private authService:AuthService , private afs:AngularFirestore) {


  }

  ngOnInit(){


    // this.api.firestoreCollection.valueChanges({idField:'id'}).subscribe(item=>
    //   {
    // this.todos=item.sort((a:any,b:any)=>
    // {return a.isDone-b.isDone});
    // })

    this.authService.currentUser.subscribe((result)=>{
      this.currentUser=result;

      this.afs.collection('todo', ref => ref.where('uid', '==', this.currentUser.uid)).valueChanges({idField:'id'}).subscribe(item=>
        {

      this.todos=item.sort((a:any,b:any)=>
      {return a.isDone-b.isDone});
      });

    })


  }



  onclick(todo:HTMLInputElement){
    if(this.currentUser.uid,todo.value){
      this.api.addTodo(todo.value,this.currentUser.uid).then(()=>{

        new Toast(`Task Added`, {
          position: 'top'});
      });
    todo.value="";
    }
  }

  onStatusChange(id:string,newStatus:boolean){
    this.api.updateTodostatus(id,newStatus).then(()=>{
      new Toast(`Task updated`, {
        position: 'top'});
    });
  }

  onDelete(id){
    this.api.deleteTodo(id).then(()=>{
      new Toast(`Task deleted`, {
        position: 'top'
    });
    })
  }

  logout(){
    return this.authService.logout();
  }

}
