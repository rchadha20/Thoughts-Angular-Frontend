import { Injectable } from '@angular/core';
import { User } from './user';
import { Blogs } from './blogs';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  endpoint: string = 'https://apricot-squid-hem.cyclic.app';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};
  constructor(private http: HttpClient, public router: Router) {}
  // Sign-in
  signIn(user: User) {
    return this.http
      .post<any>(`${this.endpoint}/signin`, user)
      .subscribe((res: any) => {
        localStorage.setItem('access_token', res.token);
        this.getUserProfile(res._id).subscribe((res) => {
          this.currentUser = res;
          console.log(this.currentUser);
          this.router.navigate(['dashboard']);
        });
      });
  }
    // Sign-up
    signUp(signupObject:any) {
      const body={
        email:signupObject.email,
        password:signupObject.password
      }
      return this.http
        .post<any>(`${this.endpoint}/signup`, body)
        .subscribe((res: any) => {
          localStorage.setItem('access_token', res.token);
          this.getUserProfile(res._id).subscribe((res) => {
            this.currentUser = res;
            console.log(this.currentUser)
            this.router.navigate(['dashboard/profile']);
          });
        });
    }
  getToken() {
    return localStorage.getItem('access_token');
  }
  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return authToken !== null ? true : false;
  }
  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigate(['']);
    }
  }
  // User profile
  getUserProfile(id: any): Observable<any> {
    let api = `${this.endpoint}/get-profile-info`;
    return this.http.get(api, { headers: this.headers }).pipe(
      map((res) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }

  //All BLogs API call
  getBlogs(): Observable<Blogs[]> {
    let api = `${this.endpoint}/blogs-all-user`;
    return this.http.get<Blogs[]>(api, { headers: this.headers });
  }

  // Error
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}