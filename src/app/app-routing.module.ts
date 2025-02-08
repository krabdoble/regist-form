import { NgModule } from '@angular/core';
import { mapToCanActivate, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guard/auth.guard';
import { ClientFormComponent } from './components/client-form/client-form.component';
import { ClientListComponent } from './components/client-list/client-list.component';
import { NavbarComponent } from './components/navbar/navbar.component';

/*const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'formulario', component: ClientFormComponent, canActivate: mapToCanActivate([AuthGuard]) },
  { path: 'lista', component: ClientListComponent, canActivate: mapToCanActivate([AuthGuard]) },
  { path: 'lista/edit/:id', component: ClientFormComponent, canActivate: mapToCanActivate([AuthGuard]) },
  
];*/
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { 
    path: '', 
    component: NavbarComponent, 
    canActivate: mapToCanActivate([AuthGuard]),
    children: [
      { path: '', redirectTo: '/formulario', pathMatch: 'full' },
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
