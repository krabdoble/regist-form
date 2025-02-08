import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  title ='test-angular'

  constructor(private loginservice: LoginService){}

  logout(){
    this.loginservice.logout();
  }

}
