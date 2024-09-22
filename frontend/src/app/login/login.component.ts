import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData = {
    username: '',
    password: ''
  };

  constructor(private authService: AuthenticationService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.loginData)
      .subscribe(response => {
        localStorage.setItem('username', this.loginData.username)
        console.log('Login successful');
        this.router.navigate(['owner'])
      }, error => {
        console.log('Login failed', error);
      });
  }
}
