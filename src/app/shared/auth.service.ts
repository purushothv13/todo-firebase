import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import Toast from 'awesome-toast-component';
import { GoogleAuthProvider } from 'firebase/auth';
import { getAuth, signInWithPopup } from "firebase/auth";
import { first, Observable } from 'rxjs';
import { todoUser } from '../interfaces/user';
import { of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser:any;
  firestoreCollection :AngularFirestoreCollection;

  user:Observable<todoUser>;

  constructor(private firestore:AngularFirestore , private auth:AngularFireAuth , private router:Router) {


  this.firestoreCollection=firestore.collection('user');

  this.currentUser= this.auth.authState.pipe(
    first()
  )



  }

   login (email:string,password:string){
    this.auth.signInWithEmailAndPassword(email,password).then(()=>
    {
      new Toast(`Login Successfull...!!!`, {
        position: 'top'});

      localStorage.setItem('token','true');
      this.router.navigate(['todo']);
    })
   }

   registerUser (email:string,password:string){
    this.auth.createUserWithEmailAndPassword(email,password).then((result)=>{


console.log(result.user.uid);
console.log(result.user);

var newUser:todoUser={  email:email,isAdmin:false,uid:result.user.uid};

this.updateUserData(newUser).then(()=>{
  alert('user');
  console.log('create a new user');
})

//TODO: Add User to Database after registration with firebase Auth

      new Toast(`Register Successfull...!!!`, {
        position: 'top'});
      this.router.navigate(['']);
    },
    err=>{
      new Toast(`Error`, {
        position: 'top'});
        console.log();
      this.router.navigate(['register']);
    })
   }

   logout(){
    this.auth.signOut().then(()=>{

      new Toast(`Logout successful...`, {
        position: 'top'});
      localStorage.removeItem('token');
      this.router.navigate([''])
    },
    err=>{
      new Toast(`Cannot Logout`, {
        position: 'top'});
    })
   }

   LoggedIn(){
    return localStorage.getItem('token');
   }

   adminLoggedIn(){
    return localStorage.getItem('token');
   }

   loginwithgmail(){
    return this.auth.signInWithPopup(new GoogleAuthProvider).then(()=>
    {

      this.router.navigate(['todo'])
    }),
    err=>{
      new Toast('Error with Google',{
        position:'top'
      });
    }
   }

   private updateUserData(user:todoUser){
    const userRef:AngularFirestoreDocument<any> = this.firestore.doc('users/'+user.uid);

    return userRef.set(user,{merge:true})
   }

}
