import { CanActivate, Router } from "@angular/router";
import { LoginService } from "../services/login/login.service";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root',
})

export class AuthGuard implements CanActivate {
  constructor(
    private loginservice: LoginService,
    private router: Router,
  ) {}
 

  canActivate() {
    if (this.loginservice.isLoggedIn()) {
      return true;
  }else {
    this.router.navigate(['/login']);
    return false
  }
}
}
