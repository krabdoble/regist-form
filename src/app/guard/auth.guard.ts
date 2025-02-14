import { CanActivate, Router } from "@angular/router";
import { LoginService } from "../services/login/login.service";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";

@Injectable({
  providedIn: 'root',
})

export class AuthGuard implements CanActivate {
  constructor(
    private loginservice: LoginService,
    private router: Router,
  ) {}
 
canActivate(): Observable<boolean> {
  return this.loginservice.isLoggedIn().pipe(
    tap(isLogged => {
      if (!isLogged) {
        this.router.navigate(['/login']);
      }
    })
  );
}



}
