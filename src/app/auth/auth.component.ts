import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  selector: 'app-auth'
})

export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router){}
  ngOnInit(): void {
    this.isLoginMode = true;
  }

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm){
   const email = form.value.email;
   const password = form.value.password;
   let authObs: Observable<AuthResponseData>;

   this.isLoading = true;
   if(!form.value){
     return;
   }
   if(this.isLoginMode){
     authObs = this.authService.login(email, password);
   }else{
     authObs = this.authService.signup(email, password);
    }

    authObs.subscribe(
      {
       next: responseData=>{
        console.log(responseData);
        this.isLoading = false;
        this.router.navigate(['/recipes']);

      },
      error: (message) => {
        this.errorMessage = message;
        this.showError(this.errorMessage);
        this.isLoading = false;
      }
     });

  form.reset()

  }

  onHandleError(){
    this.errorMessage = '';
  }

  private showError(errorMessage: string){

  }
}