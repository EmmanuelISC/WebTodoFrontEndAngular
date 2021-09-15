import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BasicAuthenticationService } from '../basic-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class HttpIntercepterBasicAuthService implements HttpInterceptor{

  constructor(private basicAuthService: BasicAuthenticationService) { }

  //Adding a common interceptor functionality for the header need to add to the security part 
  intercept(request: HttpRequest<any>, next: HttpHandler){
    
    //let username = 'eelias'
    //let password = 'dumpass'
    // turning user and pasword valus to 64 encoding
    //let basicAuthHeaderString = 'Basic ' + window.btoa(username + ':' + password);
    let basicAuthHeaderString = this.basicAuthService.getAuthenticatedToken();
    let username = this.basicAuthService.getAuthenticatedUser();

    if (basicAuthHeaderString && username) {

      request = request.clone({
        setHeaders: {
          Authorization: basicAuthHeaderString
        }
      })
    }
    

    return next.handle(request); 
  }
}
