/**
 * This service will do reques to our url webService:
 * http://localhost:8080/hello-world/{name}/{lastName}/{phone}
 */
import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';

export class HelloWorldBean{
  constructor(public message:string){}
}


@Injectable({
  providedIn: 'root'
})


export class WelcomeDataService {

  constructor( private http: HttpClient) { }

  executeHelloBeansService(name, lastName, phone){

    return this.http.get<HelloWorldBean>(`http://localhost:8080/hello-world/${name}/${lastName}/${phone}`);
    
  }
}
