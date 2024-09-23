import { Component } from '@angular/core';
import { User } from '../models/User';
import { AuthenticationService } from '../services/authentication.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  user: User = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    gender: '',
    address: '',
    phone: '',
    email: '',
    profilePicture: null,
    creditCardNumber: '',
    type: '',
    status: ''
  };

  captchaResolved: boolean = false;

  constructor(private authService: AuthenticationService) {}

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.user.profilePicture = file;
    }
  }

  onCaptchaResolved(captchaResponse: string) {
    this.captchaResolved = true;
    console.log('Captcha resolved:', captchaResponse);
  }


  onSubmit() {
    const formData = new FormData()
    formData.append('username', this.user.username)
    formData.append('password', this.user.password)
    formData.append('firstName', this.user.firstName)
    formData.append('lastName', this.user.lastName)
    formData.append('gender', this.user.gender)
    formData.append('address', this.user.address)
    formData.append('phone', this.user.phone)
    formData.append('email', this.user.email)
    formData.append('creditCardNumber', this.user.creditCardNumber)
    formData.append('recaptcha', this.captchaResolved.toString());
    formData.append('type', 'Vlasnik');

    
    if(this.user.profilePicture)
      formData.append('profilePicture', this.user.profilePicture)

    this.authService.register(formData).subscribe(
      (response) => {
        // console.log('Registration successful', response.msg);
      },
      (error) => {
        console.log('Registration failed', error);
      }
    );
  }

  validateForm() {
    // Implementacija validacije forme
    return true;
  }
}
