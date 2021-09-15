import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BasicAuthenticationService {

  constructor(private http: HttpClient) { }



  getAuthenticatedUser()
  {
    return  sessionStorage.getItem('authenticaterUser')
    
  }

  getAuthenticatedToken()
  {
    //If it brings something from autheticated user
    if(this.getAuthenticatedUser())
    return  sessionStorage.getItem('token')
    
  }

  isUserLoggedIn()
  {
    let user = sessionStorage.getItem('authenticaterUser')
    return !(user === null)
  }


  logout()
  {
    sessionStorage.removeItem('authenticaterUser')
    sessionStorage.removeItem('token')
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
          sessionStorage.setItem('token', basicAuthHeaderString);
          return data;
        }
      )
    );
    
  }



}


export class AuthenticationBean{
  constructor(public message:string){}
}