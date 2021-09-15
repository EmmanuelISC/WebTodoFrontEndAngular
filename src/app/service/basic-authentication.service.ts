import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BasicAuthenticationService {

  constructor(private http: HttpClient) { }

  authenticate(user, password)
  {
    if(user ==='eelias' && password ==='123')
    {
      sessionStorage.setItem('authenticaterUser', user);
      return true;
    }
    return false;
  }

  isUserLoggedIn()
  {
    let user = sessionStorage.getItem('authenticaterUser')
    return !(user === null)
  }

  logout()
  {
    sessionStorage.removeItem('authenticaterUser')
  }

  executeAuthenticaionService(username, password){

    // turning user and pasword valus to 64 encoding
    let basicAuthHeaderString = 'Basic ' + window.btoa(username + ':' + password);


    //Passing autorizhation to the header created
    let headers = new HttpHeaders({
      Auhorization: basicAuthHeaderString
    })

    return this.http.get<AuthenticationBean>(`http://localhost:8080/basicauth`,
    {headers}).pipe(
      map(
        data => {
          sessionStorage.setItem('authenticaterUser', username);
          return data;
        }
      )
    );
    
  }



}


export class AuthenticationBean{
  constructor(public message:string){}
}