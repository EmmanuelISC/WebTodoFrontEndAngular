/**
 * This service will do reques to our url webService:
 * http://localhost:8080/hello-world/{name}/{lastName}/{phone}
 */
import { Injectable } from '@angular/core';
import{HttpClient, HttpHeaders} from '@angular/common/http';

export class HelloWorldBean{
  constructor(public message:string){}
}


@Injectable({
  providedIn: 'root'
})


export class WelcomeDataService {

  constructor( private http: HttpClient) { }

  executeHelloBeansService(name, lastName, phone){

   /* let basicAuthHeaderString = this.createBasicAuthenticationHttpHeader();

    //Passing autorizhation to the header created
    let headers = new HttpHeaders({
      Auhorization: basicAuthHeaderString
    }) */

    return this.http.get<HelloWorldBean>(`http://localhost:8080/hello-world/${name}/${lastName}/${phone}`,
    //{headers}
    );
    
  }

  //Method that will generate the headers to can execute requests with security basic activated
  /*createBasicAuthenticationHttpHeader(){

    let username = 'eelias'
    let password = 'dumpass'
    // turning user and pasword valus to 64 encoding
    let basicAuthHeaderString = 'Basic ' + window.btoa(username + ':' + password);

    return basicAuthHeaderString;
  } */
}
