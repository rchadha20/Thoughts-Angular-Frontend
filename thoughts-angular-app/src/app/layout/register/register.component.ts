import { Component } from '@angular/core';
import { AbstractControl, Validators } from '@angular/forms';
import { FormBuilder, FormGroup, FormsModule, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';

function passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  if (password && confirmPassword && password.value !== confirmPassword.value) {
    return { 'passwordMismatch': true };
  }
  return null;
}
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
    registerForm : FormGroup;
    constructor(
      public fb: FormBuilder, public authService:AuthService,private router:Router    ){
      this.registerForm = this.fb.group({
        "email": new FormControl('', [Validators.required, Validators.email]),
        "password": new FormControl('', [Validators.required]),
        "confirmPassword": new FormControl('', [Validators.required]),

      }, { validators: passwordMatchValidator })
    }

    onSubmit() {
      if (this.registerForm.valid) {
        const signUpObject = {
          email: this.registerForm.controls['email'].value,
          password: this.registerForm.controls['password'].value
        };
        this.authService.signUp(signUpObject);
      } else {
        // Mark all form controls as touched
        Object.values(this.registerForm.controls).forEach(control => control.markAsTouched());
      }
    }
    navigate(){
      this.router.navigate(['login'])
    }

}
