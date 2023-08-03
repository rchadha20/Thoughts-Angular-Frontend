import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';
import { Profile } from 'src/app/core/profile';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  formatDate: string = '';
  isProfileSaved: boolean = false;

  profile: Profile = {
    firstName: '',
    lastName: '',
    userid: '',
    _id: '',
    email: '',
    dob: new Date(),
  };
  constructor(private service: AuthService, private router: Router) {}

  ngOnInit(): void {
    const userProfileJSON = localStorage.getItem('userProfile');
    if (userProfileJSON) {
      this.profile = JSON.parse(userProfileJSON);
      this.formatDate = new Date(this.profile.dob).toISOString().split('T')[0];
    }
  }

  onSubmit() {
    const profileObject = {
      firstName: this.profile.firstName,
      lastName: this.profile.lastName,
      dob: this.formatDate,
      email: this.profile.email,
    };

    this.service.updateUserProfile(profileObject).subscribe((res) => {
      this.profile = res;
      this.isProfileSaved = true;
    });

    const updatedUserProfile = JSON.stringify(this.profile);
    localStorage.setItem('userProfile', updatedUserProfile);
  }

  onDelete() {
    this.service.deleteUserProfile().subscribe((res) => {
      res.message.length > 0 ? this.service.doLogout() : console.log(res);
    });
  }
}
