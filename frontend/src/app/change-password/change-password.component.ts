import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  passwordData = {
    username: '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  constructor(private authService: AuthenticationService) {}

  onSubmit() {
    if(this.passwordData.newPassword == this.passwordData.confirmPassword) {
      this.passwordData.username = localStorage.getItem('username') ?? ""
      const data = {
        username: this.passwordData.username,
        password: this.passwordData.oldPassword,
        newPassword: this.passwordData.newPassword
      }
      this.authService.changePassword(data)
        .subscribe(response => {
          console.log('Change password successful', response);
        }, error => {
          console.log('Change password failed', error);
        });
    } else {
      console.log('Change password failed passwords are not the same');
    }
  }
}
