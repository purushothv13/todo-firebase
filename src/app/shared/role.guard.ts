import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import Toast from 'awesome-toast-component';
import { AdminComponent } from '../component/admin/admin.component';



@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authservice:AuthService , private afs:AngularFirestore , private router:Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        if(this.authservice.adminLoggedIn())
        {
          this.router.navigate(['admin']);
          return true;
        }
        new Toast(`You are not LoggedIn`, {
          position: 'top'});

        this.router.navigate(['']);
        return false;
      }
  }
