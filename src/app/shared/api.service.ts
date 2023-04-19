import { Injectable } from '@angular/core';
import {AngularFirestore,AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/compat/firestore'
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { first, map, of, pipe, switchMap } from 'rxjs';
import { todo } from '../interfaces/todo';
import { User } from 'firebase/auth';
import { todoUser } from '../interfaces/user';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  currentUser:any;
  firestoreCollection :AngularFirestoreCollection;



  constructor(private firestore:AngularFirestore, private authService:AuthService , private auth:AngularFireAuth , private router:Router ) {

    this.auth.currentUser.then((result)=>{
      console.log(result);


    })

    this.firestoreCollection=firestore.collection('todo');

  //  this.auth.authState.pipe(
  //     switchMap(user=>{
  //       if(user)
  //       {this.currentUser=user}
  //       return of(null);
  //     })
  // );



   }


   addTodo(title:string,uid:string){



    return this.firestoreCollection.add({
      title,
      isDone:false,
      uid:uid

    })
   }



   updateTodostatus(id:string,newStatus:boolean){
    return this.firestoreCollection.doc(id).update({isDone:newStatus});
   }

   deleteTodo(id:string){
    return this.firestoreCollection.doc(id).delete();
   }

   private updateTodo(todo:todo){
    const userRef:AngularFirestoreDocument<any> = this.firestore.doc('todo/'+todo.userUid);

    return userRef.set(todo,{merge:true})
   }


}
