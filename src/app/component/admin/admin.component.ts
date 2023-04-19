import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { ApiService } from 'src/app/shared/api.service';
import { AuthService } from 'src/app/shared/auth.service';
import { todoUser } from 'src/app/interfaces/user';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  todos:any;
  currentUser:any;
  firestoreCollection :AngularFirestoreCollection;

  constructor(private api:ApiService, private auth:AuthService,private firestore:AngularFirestore) {

    this.firestoreCollection=firestore.collection('user');
  }

  ngOnInit(): void {

  }

}
