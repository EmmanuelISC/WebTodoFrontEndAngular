import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HardcodedAuthenticationService {

  constructor() { }

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

}
