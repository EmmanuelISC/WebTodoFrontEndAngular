import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
import { API_URL } from '../app.constants';

export const TOKEN = 'token' ;
export const AUTHENTICATED_USER = 'authenticaterUser';

@Injectable({
  providedIn: 'root'
})
export class BasicAuthenticationService {

  constructor(private http: HttpClient) { }

  executeJWTAuthenticaionService(username, password){
    

  

    return this.http.post<any>(`${API_URL}/authenticate`,{username, password} ).pipe(
      map(
        data => {
          sessionStorage.setItem(AUTHENTICATED_USER, username);
          sessionStorage.setItem(TOKEN, `Bearer ${data.token}`);
          return data;
        }
      )
    );
    
  }


  getAuthenticatedUser()
  {
    return  sessionStorage.getItem(AUTHENTICATED_USER)
    
  }

  getAuthenticatedToken()
  {
    //If it brings something from autheticated user
    if(this.getAuthenticatedUser())
    return  sessionStorage.getItem(TOKEN)
    
  }

  isUserLoggedIn()
  {
    let user = sessionStorage.getItem(AUTHENTICATED_USER)
    return !(user === null)
  }


  logout()
  {
    sessionStorage.removeItem(AUTHENTICATED_USER)
    sessionStorage.removeItem(TOKEN)
  }

  executeAuthenticaionService(username, password){

    // turning user and pasword valus to 64 encoding
    let basicAuthHeaderString = 'Basic ' + window.btoa(username + ':' + password);


    //Passing autorizhation to the header created
    let headers = new HttpHeaders({
      Auhorization: basicAuthHeaderString
    })

    return this.http.get<AuthenticationBean>(`${API_URL}/basicauth`,
    {headers}).pipe(
      map(
        data => {
          sessionStorage.setItem(AUTHENTICATED_USER, username);
          sessionStorage.setItem(TOKEN, basicAuthHeaderString);
          return data;
        }
      )
    );
    
  }



}


export class AuthenticationBean{
  constructor(public message:string){}
}