import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwnerProfileService } from '../services/owner-profile-service.service';

@Component({
  selector: 'app-owner-profile',
  templateUrl: './owner-profile.component.html',
  styleUrls: ['./owner-profile.component.css']
})
export class OwnerProfileComponent {
  username: string = ''; // ID korisnika, dobijen iz URL-a ili tokena
  profile: any = {};
  tmpProfile: any = {};
  editMode = false;

  constructor(private profileService: OwnerProfileService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.username =localStorage.getItem('username') ?? ""; // Dohvati userId iz URL-a
    this.getProfile();
  }

  getProfile(): void {
    this.profileService.getProfile(this.username).subscribe(
      data => {
        this.profile = data;
        this.getProfilePicture(data)
      },
      error => {
        console.error('Greška pri dohvatanju profila', error);
      }
    );
  }

  toggleEditMode(): void {
    if(this.editMode) {
      this.profile = this.tmpProfile
    }
    this.editMode = !this.editMode;
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.profile.profilePicture = file;
      console.log(this.profile.profilePicture)
    }
  }

  getProfilePicture(user: any): string | null {
    if (user.profilePicture && user.profilePicture.data) {
      const base64String = btoa(
        String.fromCharCode(...new Uint8Array(user.profilePicture.data.data))
      );
      return `data:${user.profilePicture.contentType};base64,${base64String}`;
    }
    return null;
  }

  updateProfile(): void {
    this.profileService.updateProfile(this.username, this.profile).subscribe(
      updatedProfile => {
        this.profile = updatedProfile;
        this.tmpProfile = this.profile
        this.editMode = false;
      },
      error => {
        console.error('Greška pri ažuriranju profila', error);
      }
    );
  }
}
