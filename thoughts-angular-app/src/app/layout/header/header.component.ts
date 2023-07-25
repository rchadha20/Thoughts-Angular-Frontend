import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private router:Router,public authService: AuthService){

  }
  login(){
    this.router.navigate(['login']);
  }
  logout() {
    this.authService.doLogout()
  }
  signup(){
    this.router.navigate(['register']);
  }
}
