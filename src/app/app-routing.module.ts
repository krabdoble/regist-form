import { NgModule } from '@angular/core';
import { mapToCanActivate, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guard/auth.guard';
import { ClientFormComponent } from './components/client-form/client-form.component';
import { ClientListComponent } from './components/client-list/client-list.component';
import { NavbarComponent } from './components/navbar/navbar.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { 
    path: 'navbar', 
    component: NavbarComponent,
    canActivate: [AuthGuard], 
    children: [
      { path: '', redirectTo: 'formulario', pathMatch: 'full' },
      { path: 'formulario', component: ClientFormComponent },
      { path: 'lista', component: ClientListComponent },
      { path: 'lista/edit/:id', component: ClientFormComponent }
    ]
  },
  { path: '**', redirectTo: '/login' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
