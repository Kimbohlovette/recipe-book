import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from './auth.service';

@Injectable()

export class AuthInterceptor implements HttpInterceptor{
  constructor(private authService: AuthService){}
  intercept(req: HttpRequest<any>, next: HttpHandler){
    this.authService.user.subscribe();
    return next.handle(req);
  }
}