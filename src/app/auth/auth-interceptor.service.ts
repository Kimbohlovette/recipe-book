import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { take,exhaustMap } from "rxjs/operators";
import { AuthService } from './auth.service';

@Injectable()

export class AuthInterceptor implements HttpInterceptor{
  constructor(private authService: AuthService){}
  intercept(req: HttpRequest<any>, next: HttpHandler){
    return this.authService.user.pipe(
      take(1),
      exhaustMap(user=>{
        if(!user){
          return next.handle(req);
        }
        const modifiedRequest = req.clone(
          {
            params: new HttpParams().set('auth', String(user?.token))
          }
        );
        return next.handle(modifiedRequest);
      }));
    
  }
}