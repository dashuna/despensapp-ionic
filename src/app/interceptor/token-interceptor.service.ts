import { Injectable } from '@angular/core';
import { TokenService } from '../services/token.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(
    private tokenService: TokenService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;
    const token = this.tokenService.getToken();
    console.log("token", token);
    console.log("interceptame")
    if (token != null) {
      authReq = req.clone({headers: req.headers.set('Authorization', 'Bearer ' + token)});
    }
    return next.handle(authReq);
  }
}

//export const interceptorProvider = [{provide: HTTP_INTERCEPTORS, userClass: TokenInterceptorService, multi: true} ]
