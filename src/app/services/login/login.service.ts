import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {Router} from '@angular/router';
import {GoogleAuthProvider} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  user: any;

  constructor(
    private firebaseAuth: AngularFireAuth,
    private router:Router,
  ) {

    this.firebaseAuth.authState.subscribe((user) => {
      if (user) {
        this.user = user;
      }else{
        this.user = null
      }
    })
   }

  login(){
    const provider= new GoogleAuthProvider();

    this.firebaseAuth
    .signInWithPopup(provider)
    .then(()=>{
      this.router.navigate(['home']);
    })
    .catch((error)=>{
      console.log(error);
    });
  }

  logout(){
    this.firebaseAuth
    .signOut()
    .then(()=>{
      this.router.navigate(['login']);
    })
    .catch((error)=>{
      console.log(error);
    });
  }
  
    isLoggedIn(){
      return this.user;
    }
}
