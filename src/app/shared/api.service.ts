import { Injectable } from '@angular/core';
import {AngularFirestore,AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/compat/firestore'
import { todo } from '../interfaces/todo';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  currentUser:any;
  todoCollection :AngularFirestoreCollection;
  userCollection : AngularFirestoreCollection;
  todos: any;
  selectedUser: any;


  constructor(private firestore:AngularFirestore) {

    this.todoCollection=firestore.collection('todo');

    this.userCollection=firestore.collection('users');

  }


  //get Todo for User
  getTodosofUser(uid){

    //getting user's todo with uid

    return this.firestore.collection('todo',ref=> ref.where('uid','==',uid)).valueChanges({idField:'id'});
  }


  //get single user from db
   getUser(userId){
    return this.userCollection.doc(userId).get();
   };


  //get all users from db for admin
   getUsers(){
    return this.userCollection.valueChanges({idField:'id'});
   };


  //adding Todo to the login User
   addTodo(title:string,uid:string){
    return this.todoCollection.add({
      title,
      isDone:false,
      uid:uid
    })
   };


   //Update the users todo isDone or not
   updateTodostatus(id:string,newStatus:boolean){
    return this.todoCollection.doc(id).update({isDone:newStatus});
   };


   //delete the Todo List from the user
   deleteTodo(id:string){
    return this.todoCollection.doc(id).delete();
   };


  // updates the user according to the id
   private updateTodo(todo:todo){
    const userRef:AngularFirestoreDocument<any> = this.firestore.doc('todo/'+todo.userUid);

    return userRef.set(todo,{merge:true})
   }

}
