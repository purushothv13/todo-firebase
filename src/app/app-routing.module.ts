import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoComponent } from './component/todo/todo.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { AdminComponent } from './component/admin/admin.component';
import { AngularFireAuthGuard } from '@angular/fire/compat/auth-guard';
import { ListComponent } from './component/list/list.component';

const routes: Routes = [
  { path: 'todo',      component:TodoComponent,canActivate:[AngularFireAuthGuard]},
  { path: 'register',  component:RegisterComponent},
  { path: 'admin',     component:AdminComponent,canActivate:[AngularFireAuthGuard]},
  { path: 'list/:id',  component:ListComponent  },
  { path: '',          component:LoginComponent  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
