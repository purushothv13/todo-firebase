import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import Toast from 'awesome-toast-component';
import { GoogleAuthProvider } from 'firebase/auth';
import { first, firstValueFrom, Observable } from 'rxjs';
import { todoUser } from '../interfaces/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  currentUser:any;
  userCollection :AngularFirestoreCollection;

  selectedUser:any;
  user:Observable<todoUser>;
  isAdmin:boolean;
  userId: any;
  LoggedIn: any;

  constructor(private firestore:AngularFirestore , private auth:AngularFireAuth , private router:Router) {

  this.userCollection=firestore.collection('users');

  this.currentUser= this.auth.authState.pipe(
    first()
  )
};



  //gets user from firebase for each id

   getUser(userId){
    return this.userCollection.doc(userId).get();
   };

   //gets email&pass from fsdb and login creats localstorage
   login (email:string,password:string){
    this.auth.signInWithEmailAndPassword(email,password).then(async (res)=>
    {
      new Toast(`Login Successfull...!!!`, {
        position: 'top'});

      localStorage.setItem('token','true');

    //converts observable to promise
    //TODO : get user data from firebase
    //check if user is admin
    // isAdmin then navigate to amdin
    //else navigate to todo

      firstValueFrom( this.getUser(res.user.uid)).then((res)=>{


        var userInfo=res.data();

        if(userInfo['isAdmin']){

          this.router.navigate(['/admin']);
        }
        else{
          this.router.navigate(['/todo']);
        }
      })   });
  };


  //login using Gmail =>connects gmail with FSDB
  googleSignIn(){
    return this.auth.signInWithPopup(new GoogleAuthProvider).then(res=>
    {
      //Updates User Info with email
      var updateUser:todoUser={  email:res.user.email,isAdmin:false,uid:res.user.uid};
      this.updateUserData(updateUser);


      new Toast(`Login Successfull with Gmail`, {
        position: 'top'});
      this.router.navigate(['todo']);
      //localStorage.setItem('token',JSON.stringify(res.user?.uid))
    }),
    err=>{
      new Toast('Error with Google',{
        position:'top'
      });

    }
   };


   registerUser (email:string,password:string){
    this.auth.createUserWithEmailAndPassword(email,password).then((result)=>{

var newUser:todoUser={  email:email,isAdmin:false,uid:result.user.uid};

this.updateUserData(newUser);

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
   };

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
   };



   private updateUserData(user:todoUser){
    const userRef:AngularFirestoreDocument<any> = this.firestore.doc('users/'+user.uid);

    return userRef.set(user,{merge:true})
   }

}
