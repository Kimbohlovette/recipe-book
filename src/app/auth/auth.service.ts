import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError,throwError, BehaviorSubject } from 'rxjs';
import { User } from "./user.model";
import { tap } from 'rxjs/operators';

export interface AuthResponseData {
  kind: string,
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
  registered?: string
}


@Injectable({ providedIn: 'root'})
export class AuthService {
  constructor(private http: HttpClient){}

  user = new BehaviorSubject<User | null>(null);

  signup(email: string, password: string){
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCKs8shXZjgiWausbLnTmjkDEPgVG61V3k',
    {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(catchError(this.handleError),tap(resData=>{
      this.handleAuthentication(
        resData.email, 
        resData.localId, 
        resData.idToken, 
        resData.expiresIn);
    }))
  }

  login(email: string, password: string){
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCKs8shXZjgiWausbLnTmjkDEPgVG61V3k',
    {
      email: email,
      password: password,
      returnSecureToken: true
    })
    .pipe(catchError(this.handleError),tap(resData=>{
      this.handleAuthentication(
        resData.email, 
        resData.localId, 
        resData.idToken, 
        resData.expiresIn);
    }))
  }

  private handleError(errorRes: HttpErrorResponse){
    let errorMessage = 'An unkown error occured!'
    if(!errorRes.error || !errorRes.error.error){
      return throwError(()=>new Error(errorMessage));
    }else{
      switch(errorRes.error.error.message){
        case 'EMAIL_EXISTS':
          errorMessage = 'The email address is already in use by another account!'
          break;
        case 'OPERATION_NOT_ALLOWED':
          errorMessage = 'Password sign-in is disabled for this project!';
          break;
        case 'TOO_MANY_ATTEMPTS_TRY_LATER':
          errorMessage = 'We have blocked all requests from this device due to unusual activity. Try again later';
          break;
        case 'EMAIL_NOT_FOUND':
          errorMessage = 'Email not found!';
          break;
        case 'INVALID_PASSWORD': 
          errorMessage = 'Password not correct!';
      }

      return throwError(()=>new Error(errorMessage));
    } 
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: string){
    const expirationDate = new Date( new Date().getTime() + +expiresIn*1000 );
    const user = new User(
      email,
      userId, 
      token,
      expirationDate);
    this.user.next(user);
  }
}