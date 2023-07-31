import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  signinForm: FormGroup;
  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router
  ) {
    this.signinForm = this.fb.group({
      "email": new FormControl('', [Validators.required, Validators.email]),
      "password": new FormControl('', [Validators.required]),
    });
  }
  ngOnInit() {}
  loginUser(){
    if (this.signinForm.valid) {
      this.authService.signIn(this.signinForm.value);
  } else {
    // Mark all form controls as touched
    Object.values(this.signinForm.controls).forEach(control => control.markAsTouched());
  }
  }
  navigate(){
    this.router.navigate(['register'])
  }
}
