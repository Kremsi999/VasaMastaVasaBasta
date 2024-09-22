import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

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

  constructor(private authService: AuthenticationService) {}

  onSubmit() {
    this.authService.login(this.loginData)
      .subscribe(response => {
        localStorage.setItem('username', this.loginData.username)
        console.log('Login successful');
      }, error => {
        console.log('Login failed', error);
      });
  }
}
